import React from 'react'
import { Layers } from 'lucide-react'

export default function Footer() {
    return (
        <footer className='relative bg-bg border-t border-border px-8 py-6 overflow-hidden '>

            <div className='max-w-5xl mx-auto flex items-center justify-center flex-wrap gap-4'>
                {/* Links
                <div className='flex items-center gap-6'>
                    {['Features', 'Pricing', 'Blog', 'Contact'].map(l => (
                        <a key={l} href='#'
                            className='text-[12px] text-text-secondary hover:text-text-highlight transition-colors no-underline'>
                            {l}
                        </a>
                    ))}
                </div> */}

                <p className='text-[14px] text-white'>
                    © 2025 <span>AutoRecruit</span>
                </p>

            </div>

        </footer>
    )
}