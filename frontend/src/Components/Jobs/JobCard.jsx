import React from 'react'
import { MapPin, Briefcase, Wifi, ExternalLink, Clock } from 'lucide-react'

export default function JobCard({ job }) {
    const initials = job.company?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'JB'

    return (
        <div className='group bg-bg border border-border hover:border-accent/25 rounded-2xl p-4 flex items-start gap-4 transition-all duration-200 hover:bg-accent-deep/[0.03]'>

            {/* Logo / Initials */}
            <div className='w-12 h-12 rounded-xl bg-accent-deep/12 border border-accent/15 flex items-center justify-center shrink-0'>
                {job.logo
                    ? <img src={job.logo} alt={job.company} className='w-8 h-8 object-contain rounded' />
                    : <span className='text-[12px] font-bold text-accent'>{initials}</span>
                }
            </div>

            {/* Info */}
            <div className='flex flex-col gap-1.5 flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-2'>
                    <div>
                        <p className='text-[14px] font-semibold text-text-primary leading-tight'>{job.title}</p>
                        <p className='text-[12px] text-text-secondary mt-0.5'>{job.company}</p>
                    </div>
                    <a
                        href={job.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='shrink-0 w-8 h-8 rounded-lg bg-accent-deep/8 border border-accent/15 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-accent-deep/20 transition-all duration-150'
                    >
                        <ExternalLink size={12} className='text-accent' />
                    </a>
                </div>

                <div className='flex flex-wrap gap-1.5'>
                    {job.location && (
                        <span className='inline-flex items-center gap-1 text-[10px] text-text-secondary bg-accent-deep/5 border border-border rounded-full px-2.5 py-0.5'>
                            <MapPin size={8} className='text-text-muted' />{job.location}
                        </span>
                    )}
                    {job.experienceLevel && (
                        <span className='inline-flex items-center gap-1 text-[10px] text-text-secondary bg-accent-deep/5 border border-border rounded-full px-2.5 py-0.5'>
                            <Briefcase size={8} className='text-text-muted' />{job.experienceLevel}
                        </span>
                    )}
                    {job.remote && (
                        <span className='inline-flex items-center gap-1 text-[10px] text-text-secondary bg-accent-deep/5 border border-border rounded-full px-2.5 py-0.5'>
                            <Wifi size={8} className='text-text-muted' />{job.remote}
                        </span>
                    )}
                    {job.postedAt && (
                        <span className='inline-flex items-center gap-1 text-[10px] text-text-secondary bg-accent-deep/5 border border-border rounded-full px-2.5 py-0.5'>
                            <Clock size={8} className='text-text-muted' />{job.postedAt}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}