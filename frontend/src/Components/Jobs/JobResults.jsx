import { MapPin, ArrowLeft } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import JobCard from "./JobCard"
import SkeletonCard from "./SkeletonCard"
import JobEmpty from "./JobEmpty"

export default function JobResults({ jobs = [], loading = false}) {

    return (
        <div className='flex flex-col gap-5'>

            <div className='flex items-center gap-3'>
                <button
                    className='w-9 h-9 rounded-xl bg-bg border border-border flex items-center justify-center hover:border-accent/30 hover:bg-accent-deep/8 transition-all duration-150 shrink-0'
                >
                    <ArrowLeft size={15} className='text-text-secondary' />
                </button>
            </div>

            {!loading && (
                <div className='flex items-center justify-between px-1'>
                    <p className='text-[12px] text-text-secondary'>
                        {jobs.length > 0
                            ? <><span className='text-text-primary font-medium'>{jobs.length} jobs</span> found</>
                            : 'No results found'
                        }
                    </p>
                </div>
            )}

            {loading && (
                <div className='flex flex-col gap-3'>
                    {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}

            {!loading && jobs.length === 0 && (
                <JobEmpty/>
            )}

            {!loading && jobs.length > 0 && (
                <div className='flex flex-col gap-2.5'>
                    {jobs.map((job, i) => <JobCard key={i} job={job} />)}
                </div>
            )}

        </div>
    )
}