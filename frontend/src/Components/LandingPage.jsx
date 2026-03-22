import React from 'react'
import SecodaryButton from './Buttons/SecodaryButton'
import { useNavigate } from 'react-router'

export default function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden text-center flex flex-col justify-center items-center gap-7 min-h-screen bg-bg'>

            <div className='absolute rounded-full border border-accent/6 w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none' />
            <div className='absolute rounded-full border border-accent/6 w-[540px] h-[540px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none' />
            <div className='absolute rounded-full border border-accent/6 w-[720px] h-[720px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none' />

            <div className='relative z-10 flex gap-2 bg-bg-secondary border border-border justify-center items-center h-[38px] px-5 rounded-3xl'>
                <span className='w-1.75 h-1.75 rounded-full bg-accent' />
                <p className='text-sm font-medium text-text-highlight tracking-wide'>
                    AI-Powered Career Platform
                </p>
            </div>

            <div className='relative z-10'>
                <p className='text-6xl font-bold text-text-primary tracking-tight'>
                    AI-Powered Resume Analysis
                </p>
                <p className='text-6xl font-bold tracking-tight text-accent'>
                    & Job Matching
                </p>
            </div>

            <p className='relative z-10 text-text-secondary max-w-xl leading-relaxed'>
                Transform your job search with intelligent resume analysis and personalized
                job recommendations. Let AutoRecruit help you land your dream job faster.
            </p>

            <div className='relative z-10 flex gap-3 items-center'>
                <SecodaryButton 
                onclick={() => { navigate("/upload") }}
                text={"Upload Resume"} />
                <SecodaryButton text={"Explore Jobs →"}/>
            </div>
 

        </div>
    )
} 