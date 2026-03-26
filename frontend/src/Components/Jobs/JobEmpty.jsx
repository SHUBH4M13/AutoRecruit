import React from 'react'
import { SearchX } from 'lucide-react'

export default function JobEmpty() {
  return (
    <div className='bg-bg border border-border rounded-2xl flex flex-col items-center gap-3 py-16 text-center'>
    <div className='w-12 h-12 rounded-xl bg-accent-deep/10 border border-accent/18 flex items-center justify-center'>
        <SearchX size={20} className='text-accent/50' />
    </div>
    <div>
        <p className='text-[14px] font-semibold text-text-primary'>No jobs found</p>
        <p className='text-[12px] text-text-secondary mt-1'>Try different keywords or broaden your filters</p>
    </div>
    <button
        className='mt-1 text-[12px] font-medium text-accent hover:underline'
    >
        ← Modify search
    </button>
</div>
  )
}
