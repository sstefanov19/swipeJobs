"use client";
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import JobCard from '~/components/JobCard';

interface Job {
  id: string;
  title: string;
  location: { display_name: string };
  description: string;
  redirect_url?: string;
}

export default function Jobs() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canSwipe, setCanSwipe] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const fetchJob = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<{ results: Job[] }>('/api/jobs');
      if (response.data.results.length > 0) {
        setJob(response.data.results[0] ?? null);
      } else {
        setJob(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchJob();
  }, []);

  const handleSwipe = async () => {
    await fetchJob();
  };

  const childRefs = useMemo(
    () => Array(1).fill(0).map(() => React.createRef<TinderCard>()),
    []
  );

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);
    setCanSwipe(index - 1 >= 0);
    setCanGoBack(true);

  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`);
    void fetchJob();
  };

  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex >= 0) {

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (childRefs[currentIndex]?.current) {
          await childRefs[currentIndex].current.swipe(dir);
      }
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setCanSwipe(true);
    setCanGoBack(newIndex < 1);
  };

  return (
    <main className="flex min-h-screen w-full justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-600 to-slate-400">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-center mt-16 text-slate-100">Job Listings</h1>
        {isLoading ? (
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg animate-pulse">
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900 text-red-200 rounded-lg p-6 shadow-lg">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        ) : job ? (
          <div className="flex flex-col items-center">
            <div className="cardContainer w-[600px]  h-[300px]">
              <TinderCard
                ref={childRefs[0]}
                className="swipe absolute"
                key={job.id}
                onSwipe={(dir) => swiped(dir, job.title, 0)}

                onCardLeftScreen={() => outOfFrame(job.title, 0)}
              >
              <JobCard {...job} handleSwipe={handleSwipe} />
              </TinderCard>
            </div>
            <div className="buttons flex flex-wrap justify-center m-5">
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] shadow-md hover:scale-105"
                onClick={() => swipe('left')}
                disabled={!canSwipe}
              >
                Swipe left!
              </button>
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] shadow-md hover:scale-105"
                onClick={goBack}
                disabled={!canGoBack}
              >
                Undo swipe!
              </button>
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] shadow-md hover:scale-105"
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
