import React from 'react'

export default function SkeletonCard() {
  return (
        <div className='bg-accent-deep/5 border border-border rounded-2xl p-4 flex items-center gap-4 animate-pulse'>
            <div className='w-12 h-12 rounded-xl bg-accent-deep/10 shrink-0' />
            <div className='flex flex-col gap-2 flex-1'>
                <div className='w-2/5 h-3 bg-accent-deep/10 rounded-full' />
                <div className='w-1/3 h-2.5 bg-accent-deep/8 rounded-full' />
                <div className='flex gap-1.5 mt-1'>
                    <div className='w-16 h-4 bg-accent-deep/8 rounded-full' />
                    <div className='w-14 h-4 bg-accent-deep/8 rounded-full' />
                    <div className='w-12 h-4 bg-accent-deep/8 rounded-full' />
                </div>
            </div>
        </div>
    )
}
