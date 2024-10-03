"use client";
import React, { useState, useMemo, MutableRefObject } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import JobCard from '~/components/JobCard';

interface Job {
  id: string;
  title: string;
  location: { display_name: string };
  description: string;
  redirect_url?: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get<{ results: Job[] }>('/api/jobs');
  return response.data.results;
};

export default function Jobs() {
  const queryClient = useQueryClient();
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(jobs.length - 1);
  const [canSwipe, setCanSwipe] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const job = jobs[currentIndex] || null;

  const handleSwipe = async () => {
    await queryClient.invalidateQueries({ queryKey: ['jobs'] });
  };

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);
    setCanSwipe(index - 1 >= 0);
    setCanGoBack(true);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`);
    void handleSwipe();
  };

  const goBack = () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setCanSwipe(true);
    setCanGoBack(newIndex < jobs.length - 1);
  };

  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex >= 0) {
      if (childRefs[currentIndex]?.current) {
        childRefs[currentIndex].current.swipe(dir);
      }
    }
  };

  const childRefs = useMemo(
    () => Array(jobs.length).fill(0).map(() => React.createRef() as MutableRefObject<{ swipe: (dir: 'left' | 'right') => void }>),
    [jobs.length]
  );

  return (
    <main className="flex min-h-screen w-full justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-600 to-slate-400">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-center mt-16 text-slate-100">Job Listings</h1>
        {isLoading ? (
          <div className="bg-slate-800 rounded-lg p-6  animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900 text-red-200 rounded-lg p-6 ">
            <p className="font-semibold">Error</p>
            <p>{error.message}</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="cardContainer w-[600px] h-[300px] mb-5">
              {jobs.map((job, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe absolute"
                  key={job.id}
                  onSwipe={(dir) => swiped(dir, job.title, index)}
                  onCardLeftScreen={() => outOfFrame(job.title, index)}
                >
                  <JobCard {...job} handleSwipe={handleSwipe} />
                </TinderCard>
              ))}
            </div>
            <div className="buttons flex flex-wrap justify-center m-5">
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px]  hover:scale-105"
                onClick={() => swipe('left')}
                disabled={!canSwipe}
              >
                Swipe left!
              </button>
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] hover:scale-105"
                onClick={goBack}
                disabled={!canGoBack}
              >
                Undo swipe!
              </button>
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px]  hover:scale-105"
                onClick={() => swipe('right')}
                disabled={!canSwipe}
              >
                Swipe right!
              </button>
            </div>
            {lastDirection ? (
              <h2 key={lastDirection} className="infoText flex justify-center text-white animate-popup">
                You swiped {lastDirection}
              </h2>
            ) : (
              <h2 className="infoText flex justify-center text-white animate-popup">
                Swipe a card or press a button to get Restore Card button visible!
              </h2>
            )}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg text-center">
            <p className="text-slate-300">No job available</p>
          </div>
        )}
      </div>
    </main>
  );
}
