import React from 'react'
import { useState } from 'react'
import { LayoutGrid,Clipboard} from 'lucide-react'

export default function JdBox() {

    const [jd, setJd] = useState('')
    const isReady = jd.length > 30

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setJd(text.slice(0, 5000))
        } catch {
            // fallback — user can paste manually
        }
    }

    return (
        <div className='bg-bg-secondary border border-border rounded-2xl p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-2.5'>
                <div className='w-8.5 h-8.5 rounded-[9px] bg-accent-deep/18 border border-accent/18 flex items-center justify-center shrink-0'>
                    <LayoutGrid size={15} className='text-accent' />
                </div>
                <div>
                    <p className='text-[14px] font-semibold text-text-primary'>Job Description</p>
                    <p className='text-[11px] text-text-secondary'>Paste the full JD for best results</p>
                </div>
            </div>

            <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value.slice(0, 5000))}
                placeholder={'Paste the job description here...\n\ne.g. We are looking for a Senior Frontend Engineer with 4+ years of React experience...'}
                className='
                            w-full flex-1 bg-accent-deep/5 border border-border rounded-xl
                            text-text-primary text-[13px] placeholder:text-text-muted
                            p-3.5 resize-none h-42 leading-relaxed outline-none
                            focus:border-accent/40 focus:bg-accent-deep/8 transition-all duration-200
                        '
            />

            <div className='flex items-center justify-between'>
                <button
                    onClick={handlePaste}
                    className='inline-flex items-center gap-1.5 text-[12px] font-medium text-text-secondary border border-border rounded-lg px-3.5 py-1.5 hover:text-text-highlight hover:border-accent/28 hover:bg-accent/[0.05] transition-all duration-150'
                >
                    <Clipboard size={12} />
                    Paste from clipboard
                </button>
                <span className={`text-[11px] ${jd.length > 0 ? 'text-text-secondary' : 'text-text-muted'}`}>
                    {jd.length} / 5000
                </span>
            </div>
        </div>
    )
}
