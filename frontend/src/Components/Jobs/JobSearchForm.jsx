import { useState } from 'react'
import { Search, MapPin, Briefcase, Wifi } from 'lucide-react'
import SelectField from './SelectedField'

const EXPERIENCE_LEVELS = [
    'Internship', 'Entry level', 'Associate',
    'Mid-Senior level', 'Director', 'Executive',
]
const REMOTE_OPTIONS = ['On-Site', 'Remote', 'Hybrid']

export default function JobSearchForm({ onSubmit }) {
    const [keyword, setKeyword] = useState('')
    const [location, setLocation] = useState('')
    const [experienceLevel, setExperienceLevel] = useState('')
    const [remote, setRemote] = useState('')

    const isReady = keyword.trim().length > 0

    return (
        <div className='flex flex-col gap-6'>

            {/* Form card */}
            <div className='bg-bg border border-border rounded-2xl p-6 flex flex-col gap-4'>

                {/* Keyword */}
                <div className='flex flex-row items-center gap-1.5'>

                    <div>
                        <p className='text-[11px] font-semibold text-text-secondary uppercase tracking-wide'>Job Title / Keyword</p>
                        <div className='relative'>
                            <Search size={13} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted' />
                            <input
                                type='text'
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && isReady && onSubmit?.({ keyword, location, experienceLevel, remote })}
                                placeholder='e.g. Frontend Engineer, Product Manager...'
                                className='w-full bg-accent-deep/5 border border-border rounded-xl text-text-primary text-[13px] placeholder:text-text-muted pl-9 pr-3.5 py-2.5 outline-none focus:border-accent/40 focus:bg-accent-deep/8 transition-all duration-200'
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className='flex flex-col gap-1.5'>
                        <p className='text-[11px] font-semibold text-text-secondary uppercase tracking-wide'>Location</p>
                        <div className='relative'>
                            <MapPin size={13} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted' />
                            <input
                                type='text'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder='e.g. Bangalore, Pune, Mumbai...'
                                className='w-full bg-accent-deep/5 border border-border rounded-xl text-text-primary text-[13px] placeholder:text-text-muted pl-9 pr-3.5 py-2.5 outline-none focus:border-accent/40 focus:bg-accent-deep/8 transition-all duration-200'
                            />
                        </div>
                    </div>

                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <SelectField icon={Briefcase} label='Experience' placeholder='Select level' value={experienceLevel} onChange={setExperienceLevel} options={EXPERIENCE_LEVELS} />
                    <SelectField icon={Wifi} label='Work Type' placeholder='Select type' value={remote} onChange={setRemote} options={REMOTE_OPTIONS} />
                </div>

                <button
                    onClick={() => isReady && onSubmit?.({ keyword, location, experienceLevel, remote })}
                    disabled={!isReady}
                    className='w-full inline-flex items-center justify-center gap-2 bg-accent-deep text-text-primary text-[13px] font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-[#A21CAF] hover:shadow-[0_0_24px_rgba(232,121,249,0.18)] active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent-deep disabled:hover:shadow-none'
                >
                    <Search size={13} />
                    Search Jobs
                </button>

            </div>
        </div>
    )
}