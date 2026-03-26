import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'

const STEPS = [
    'Reading your resume...',
    'Parsing job description...',
    'Matching skills & keywords...',
    'Scoring your profile...',
    'Generating AI suggestions...',
    'Finalising your report...',
]

export default function LoadingScreen({ visible = true }) {
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState([])
    const [dots, setDots] = useState('')

    useEffect(() => {
        if (!visible) {
            setCurrentStep(0)
            setCompletedSteps([])
            return
        }

        const stepTimer = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < STEPS.length - 1) {
                    setCompletedSteps(c => [...c, prev])
                    return prev + 1
                }
                clearInterval(stepTimer)
                return prev
            })
        }, 1100)

        return () => clearInterval(stepTimer)
    }, [visible])

    useEffect(() => {
        const dotsTimer = setInterval(() => {
            setDots(d => d.length >= 3 ? '' : d + '.')
        }, 400)
        return () => clearInterval(dotsTimer)
    }, [])

    if (!visible) return null

    return (
        <div className='fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center px-6'>
            <div className='bg-bg border border-border rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-7 shadow-[0_0_60px_rgba(162,28,175,0.08)]'>

                {/* Animated icon */}
                <div className='relative flex items-center justify-center'>
                    <div className='absolute w-16 h-16 rounded-full border border-accent/20 animate-ping' style={{ animationDuration: '1.8s' }} />
                    <div className='absolute w-20 h-20 rounded-full border border-accent/10 animate-ping' style={{ animationDuration: '2.4s', animationDelay: '0.3s' }} />
                    <div className='w-12 h-12 rounded-[14px] bg-accent-deep/20 border border-accent/25 flex items-center justify-center'>
                        <Zap size={22} className='text-accent' fill='currentColor' />
                    </div>
                </div>

                {/* Title */}
                <div className='text-center flex flex-col gap-1'>
                    <p className='text-[16px] font-semibold text-text-primary'>
                        Analysing your resume{dots}
                    </p>
                    <p className='text-[12px] text-text-secondary'>This usually takes a few seconds</p>
                </div>

                {/* Progress bar */}
                <div className='w-full flex flex-col gap-2'>
                    <div className='w-full h-1 bg-accent/10 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-accent rounded-full transition-all duration-700 ease-in-out'
                            style={{ width: `${((completedSteps.length + 1) / STEPS.length) * 100}%` }}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-[10px] text-text-muted'>
                            Step {Math.min(currentStep + 1, STEPS.length)} of {STEPS.length}
                        </span>
                        <span className='text-[10px] text-accent'>
                            {Math.round(((completedSteps.length + 1) / STEPS.length) * 100)}%
                        </span>
                    </div>
                </div>

                {/* Steps list */}
                <div className='w-full flex flex-col gap-2'>
                    {STEPS.map((step, i) => {
                        const isDone = completedSteps.includes(i)
                        const isActive = i === currentStep

                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-300
                                    ${isActive ? 'bg-accent-deep/10 border-accent/20' : ''}
                                    ${isDone ? 'bg-transparent border-transparent opacity-40' : ''}
                                    ${!isActive && !isDone ? 'bg-transparent border-transparent opacity-20' : ''}
                                `}
                            >
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                                    ${isDone ? 'bg-emerald-500/20 border border-emerald-500/30' : ''}
                                    ${isActive ? 'border border-accent/40 bg-accent/10' : ''}
                                    ${!isActive && !isDone ? 'border border-border' : ''}
                                `}>
                                    {isDone && (
                                        <svg width='8' height='8' viewBox='0 0 10 10' fill='none'>
                                            <path d='M2 5l2.5 2.5L8 3' stroke='#34d399' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                        </svg>
                                    )}
                                    {isActive && (
                                        <div className='w-1.5 h-1.5 rounded-full bg-accent animate-pulse' />
                                    )}
                                </div>
                                <span className={`text-[12px] font-medium transition-all duration-300
                                    ${isActive ? 'text-text-primary' : 'text-text-secondary'}
                                `}>
                                    {step}
                                </span>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}