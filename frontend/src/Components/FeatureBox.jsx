import React from 'react'

export default function FeatureBox({ icon: Icon, title, description }) {
  return (
    <div className='py-6 px-5 rounded-2xl bg-bg border border-border hover:border-accent hover:bg-bg-elevated/30 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(232,121,249,0.08)] group'>


        <div className='flex justify-center items-center mb-5'>
            <div className='bg-accent-deep/20 border border-accent/15 rounded-xl h-16 w-16 flex items-center justify-center group-hover:bg-accent-deep/30 group-hover:border-accent/30 transition-all duration-200'>
                {Icon && <Icon size={28} className='text-accent-soft' />}
            </div>
        </div>

        <div className='flex flex-col gap-2 text-center'>
            <p className='text-[25px] font-semibold text-text-primary'>
                {title || 'Resume Analysis'}
            </p>
            <p className='text-[16px] text-text-primary leading-relaxed'>
                {description || 'AI-powered analysis of your resume to identify strengths and areas for improvement.'}
            </p>
        </div>

    </div>
  )
}