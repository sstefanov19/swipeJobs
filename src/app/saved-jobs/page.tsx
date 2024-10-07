"use client";
import { useUser } from '@clerk/nextjs'
import React from 'react'

export default function SavedJobs() {

    const {user , isSignedIn} = useUser();

  return (
    <main className='flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-600 to-slate-400 '>

       {
        isSignedIn ? (
        <h1 className='text-slate-200 font-bold'> {user.fullName}&apos;s saved jobs</h1>
       ) : <h1 className='text-slate-200 font-bold'>No user is found</h1>
       }
    </main>
)
}
