import React from 'react'

export default function Option({text , onclick}) {
    return (
        <div>
            <button 
            onClick={onclick}
            className='text-[14px] font-medium cursor-pointer text-text-highlight border border-border px-4 py-2.5 rounded-lg hover:bg-accent/[0.08] hover:border-accent/40 transition-all duration-150'>
                {text}
            </button>
        </div>
    )
}
