import { useState } from 'react'
import { ChevronDown } from 'lucide-react'


export default function SelectField({ icon: Icon, label, value, onChange, options, placeholder }) {
    const [open, setOpen] = useState(false)
    return (
        <div className='flex flex-col gap-1.5 relative'>
            <p className='text-[11px] font-semibold text-text-secondary uppercase tracking-wide'>{label}</p>
            <button
                onClick={() => setOpen(o => !o)}
                className={`w-full flex items-center justify-between gap-2 border rounded-xl px-3.5 py-2.5 text-[13px] transition-all duration-200 text-left
                    ${open ? 'border-accent/40 bg-accent-deep/8' : 'border-border bg-accent-deep/5 hover:border-accent/30'}`}
            >
                <div className='flex items-center gap-2'>
                    <Icon size={12} className='text-accent shrink-0' />
                    <span className={value ? 'text-text-primary' : 'text-text-muted'}>{value || placeholder}</span>
                </div>
                <ChevronDown size={13} className={`text-text-secondary transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className='absolute top-full left-0 right-0 mt-1.5 z-20 bg-bg border border-border rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]'>
                    {options.map((opt) => (
                        <button key={opt} onClick={() => { onChange(opt); setOpen(false) }}
                            className={`w-full text-left px-3.5 py-2.5 text-[13px] transition-all duration-150
                                ${value === opt ? 'bg-accent-deep/15 text-accent' : 'text-text-primary hover:bg-accent-deep/8'}`}
                        >{opt}</button>
                    ))}
                </div>
            )}
        </div>
    )
}