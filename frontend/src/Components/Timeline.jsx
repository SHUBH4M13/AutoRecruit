import React from 'react'
import { FileText, Sparkles, Briefcase, Zap } from 'lucide-react'

const stages = [
    {
        step: '01',
        title: 'Upload Your Resume',
        description: 'Drop your resume in any format. Our parser instantly extracts your skills, experience, and achievements.',
        icon: FileText,
        flip: false,
    },
    {
        step: '02',
        title: 'AI Analyses Your Profile',
        description: 'Our model scores your resume, detects gaps, and benchmarks you against top candidates in your field.',
        icon: Sparkles,
        flip: true,
    },
    {
        step: '03',
        title: 'Get Matched to Jobs',
        description: 'Receive a curated list of roles that align with your profile, ranked by compatibility score.',
        icon: Briefcase,
        flip: false,
    },
    {
        step: '04',
        title: 'Land Your Dream Job',
        description: 'Apply with confidence using AI-tailored cover letters and interview prep powered by your resume data.',
        icon: Zap,
        flip: true,
    },
]

function TimelineNode({ step, isFirst, isLast }) {
    return (
        <div className='flex flex-col items-center z-10'>
            <div className={`w-px flex-1 bg-linear-to-b from-transparent to-accent/20 ${isFirst ? 'opacity-0' : ''}`} />

            <div className='relative flex items-center justify-center w-16 h-16 rounded-full bg-bg-secondary border border-accent/35 flex-shrink-0'>
                <span className='text-[12px] font-bold text-accent'>{step}</span>
                <div className='absolute w-[54px] h-[54px] rounded-full border border-accent/10' />
            </div>

            <div className={`w-px flex-1 bg-linear-to-b from-accent/20 to-transparent ${isLast ? 'opacity-0' : ''}`} />
        </div>
    )
}

function IconBox({ icon: Icon }) {
    return (
        <div className='w-22 h-22 rounded-2xl bg-accent-deep/15 border border-accent/18 flex items-center justify-center hover:bg-accent-deep/25 hover:border-accent/35 transition-all duration-200'>
            <Icon size={36} className='text-accent' />
        </div>
    )
}

export default function Timeline() {
    return (
        <section className='relative overflow-hidden bg-bg py-16 px-8'>

            <div className='text-center mb-12 relative z-10'>
                <h2 className='text-6xl font-bold text-text-primary mb-5 '>
                    Your path to the <span className='text-accent'>dream job</span>
                </h2>
        </div>

            <div className='relative flex flex-col max-w-2xl mx-auto'>


                <div className='absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/25 to-transparent pointer-events-none' />

                {stages.map((stage, i) => {
                    const Icon = stage.icon
                    const isFirst = i === 0
                    const isLast = i === stages.length - 1

                    return (
                        <div key={stage.step} className='grid grid-cols-[3fr_150px_3fr] items-center min-h-32.5'>

                            {!stage.flip ? (
                                <div className='flex justify-end pr-6 mb-4'>
                                    <IconBox icon={Icon} />
                                </div>
                            ) : (
                                <div className='pr-4 text-right'>
                                    <span className='inline-block text-[10px] font-semibold uppercase tracking-[0.07em] text-accent-deep bg-accent-deep/12 border border-accent/12 rounded-full px-2.5 py-0.5 mb-2'>
                                        Step {stage.step}
                                    </span>
                                    <p className='text-2xl font-bold text-text-primary mb-4'>{stage.title}</p>
                                    <p className='text-[14px] text-text-secondary leading-relaxed'>{stage.description}</p>
                                </div>
                            )}

                            <TimelineNode step={stage.step} isFirst={isFirst} isLast={isLast} />

                            {stage.flip ? (
                                <div className='flex justify-start pl-6 mb-4'>
                                    <IconBox icon={Icon} />
                                </div>
                            ) : (
                                <div className='pl-6 text-left w-full '>
                                    <span className='inline-block text-[10px] font-semibold uppercase tracking-[0.07em] text-accent-deep bg-accent-deep/12 border border-accent/12 rounded-full px-2.5 py-0.5 mb-2'>
                                        Step {stage.step}
                                    </span>
                                    <p className='text-2xl font-bold text-text-primary mb-2'>{stage.title}</p>
                                    <p className='text-[14px] text-text-secondary leading-relaxed'>{stage.description}</p>
                                </div>
                            )}

                        </div>
                    )
                })}
            </div>

        </section>
    )
}