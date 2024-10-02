"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowUpRight, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Job {
  id: string;
  title: string;
  location: { display_name: string };
  description: string;
  redirect_url?: string; // Make redirect_url optional
}

export default function Jobs() {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = async () => {
    try {
      const response = await axios.get<{ results: Job[] }>('/api/jobs');
      if (response.data.results.length > 0) {
        setJob(response.data.results[0] ?? null);
      } else {
        setJob(null);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchJob();
  }, []);

  const handleSwipe = async () => {
    // Logic for handling swipe (e.g., save job, discard job, etc.)
    // After handling the swipe, fetch a new job
    await fetchJob();
  };

  return (
    <main className="flex min-h-screen w-full  justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-600 to-slate-400">
    <div className="w-ful  max-w-2xl">
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
        <div className="bg-slate-800  rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">{job.title}</h2>
            <p className="text-slate-300 mb-4">{job.description}</p>
            {job.redirect_url ? (
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Job Details
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            ) : (
              <p className="text-slate-400 italic">No URL available</p>
            )}
          </div>
          <div className="bg-slate-700 px-6 py-4 flex justify-between items-center">
            <button
              onClick={handleSwipe}
              className="flex items-center justify-center w-1/2 py-2 rounded-l-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
            >
              <ThumbsDown className="mr-2 h-5 w-5" />
              Pass
            </button>
            <div className="w-px h-8 bg-slate-600"></div>
            <button
              onClick={handleSwipe}
              className="flex items-center justify-center w-1/2 py-2 rounded-r-full bg-green-600 hover:bg-green-700 transition-colors text-white font-medium"
            >
              Interested
              <ThumbsUp className="ml-2 h-5 w-5" />
            </button>
          </div>
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
