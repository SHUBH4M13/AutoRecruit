import React from 'react'

export default function SecodaryButton({text , onclick }) {
    return (
        <button 
        onClick={onclick}
        className='text-sm text-text-highlight border border-text-highlight/50 px-5 py-3 rounded-[10px] hover:bg-bg-elevated hover:text-text-highlight transition-all duration-200 cursor-pointer'>
        {text}
    </button>
    )
}
