import { Sparkles } from 'lucide-react'

export default function AISuggestions({ suggestions = [] }) {

    return (
        <div className='bg-bg border max-w-96 border-border rounded-2xl p-6 flex flex-col gap-4'>

            <div className='flex items-center gap-2.5'>
                <div className='w-[34px] h-[34px] rounded-[9px] bg-accent-deep/18 border border-accent/18 flex items-center justify-center shrink-0'>
                    <Sparkles size={15} className='text-accent' />
                </div>
                <div>
                    <p className='text-[14px] font-semibold text-text-primary'>AI Suggestions</p>
                    <p className='text-[11px] text-text-secondary'>Actionable tips to improve your match</p>
                </div>
            </div>

            {suggestions.length === 0 ? (
                <div className='flex flex-col items-center gap-2 py-8 text-center'>
                    <Sparkles size={22} className='text-accent/40' />
                    <p className='text-[13px] text-text-muted'>Suggestions will appear after analysis</p>
                </div>
            ) : (
                <div className='flex flex-col gap-2'>
                    {suggestions.map((s, i) => (
                        <div key={i} className='flex items-start gap-3 px-4 py-3 bg-accent-deep/5 border border-border rounded-xl'>
                            <span className='w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5' />
                            <div className='flex flex-col gap-0.5'>
                                <p className='text-[13px] font-medium text-text-primary'>{s.title}</p>
                                <p className='text-[12px] text-text-secondary leading-relaxed'>{s.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}