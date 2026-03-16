import React from 'react'

export default function PrimaryButton({text}) {
  return (
    <button className='text-sm border-accent-deep text-accent-deep px-5 py-3 rounded-[10px] transition-all duration-200'>
            {text}
    </button>
  )
}
