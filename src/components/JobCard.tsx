import { ArrowUpRight, ThumbsDown, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import React, { MouseEventHandler } from 'react'

interface Job {
    handleSwipe: MouseEventHandler<HTMLButtonElement> | undefined;
    id: string;
    title: string;
    location: { display_name: string };
    description: string;
    redirect_url?: string; // Make redirect_url optional
  }

const JobCard: React.FC<Job> = (props) => {
  return (
    <div className="bg-slate-800  rounded-lg overflow-hidden shadow-lg">
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-slate-100 mb-2">{props.title}</h2>
      <p className="text-slate-300 mb-4">{props.description}</p>

        <Link
          href={props.redirect_url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Job Details
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
    </div>
    <div className="bg-slate-700 px-6 py-4 flex justify-between items-center">
      <button
        onClick={props.handleSwipe}
        className="flex items-center justify-center w-1/2 py-2 rounded-l-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
      >
        <ThumbsDown className="mr-2 h-5 w-5" />
        Pass
      </button>
      <div className="w-px h-8 bg-slate-600"></div>
      <button
        onClick={props.handleSwipe}
        className="flex items-center justify-center w-1/2 py-2 rounded-r-full bg-green-600 hover:bg-green-700 transition-colors text-white font-medium"
      >
        Interested
        <ThumbsUp className="ml-2 h-5 w-5" />
      </button>
    </div>
  </div>
  )
}

export default JobCard;
