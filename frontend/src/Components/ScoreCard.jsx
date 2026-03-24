import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Zap, TrendingUp, CheckCircle2, XCircle } from 'lucide-react'

export default function ScoreCard({score = 78}) {

    const getScoreLabel = (s) => {
        if (s >= 80) return { label: 'Strong Match', color: 'text-emerald-400' }
        if (s >= 60) return { label: 'Good Match', color: 'text-accent' }
        if (s >= 40) return { label: 'Partial Match', color: 'text-amber-400' }
        return { label: 'Low Match', color: 'text-red-400' }
    }

    const { label, color } = getScoreLabel(score)

    return (
        <div className='bg-bg border max-w-136 border-border rounded-2xl p-6 flex flex-col gap-6'>

            <div className='flex items-center gap-2.5'>
                <div className='w-[34px] h-[34px] rounded-[9px] bg-accent-deep/18 border border-accent/18 flex items-center justify-center shrink-0'>
                    <TrendingUp size={15} className='text-accent' />
                </div>
                <div>
                    <p className='text-[14px] font-semibold text-text-primary'>Match Score</p>
                    <p className='text-[11px] text-text-secondary'>Based on your resume vs JD</p>
                </div>
            </div>

            <div className='flex items-center gap-8'>
                <div className='w-28 h-28 shrink-0'>
                    <CircularProgressbar
                        value={score}
                        text={`${score}%`}
                        styles={buildStyles({
                            textSize: '18px',
                            pathColor: '#A21CAF',
                            textColor: 'var(--color-text-primary, #fff)',
                            trailColor: 'rgba(162,28,175,0.12)',
                            pathTransitionDuration: 0.8,
                        })}
                    />
                </div>

                <div className='flex flex-col gap-1.5'>
                    <span className={`text-[22px] font-bold ${color}`}>{label}</span>
                    <p className='text-[12px] text-text-secondary leading-relaxed'>
                        Your resume matches <span className='text-text-primary font-medium'>{score}%</span> of the job requirements.
                    </p>
                </div>
            </div>
        </div>
    )
}