import React, { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
    {
        q: 'How does the AI resume analysis work?',
        a: 'Our AI parses your uploaded resume and extracts key details like skills, experience, and achievements. It then benchmarks your profile against thousands of successful resumes in your field and gives you a detailed score with actionable suggestions to improve your chances.',
    },
    {
        q: 'How does AutoRecruit improve my resume?',
        a: 'It suggests missing skills, keywords, and improvements based on the job description you provide.',
    },
    {
        q: 'How does the AI resume analysis work?',
        a: 'Our AI parses your uploaded resume and extracts key details like skills, experience, and achievements. It then benchmarks your profile against thousands of successful resumes in your field and gives you a detailed score with actionable suggestions to improve your chances.',
    },

]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <section className='relative overflow-hidden bg-bg py-16 px-8'>

            <div className='text-center mb-10 relative z-10'>
                <h2 className='text-6xl font-bold text-text-primary'>
                    Frequently asked questions
                </h2>
                <p className='text-[16px] text-text-secondary mt-7'>Everything you need to know about AutoRecruit.</p>
            </div>

            {/* FAQ list */}
            <div className='relative z-10 max-w-[820px] mx-auto flex flex-col gap-2.5'>
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i
                    return (
                        <div
                            key={i}
                            className={`bg-bg hover:bg-bg-elevated/30 transition-all duration-200 rounded-xl overflow-hidden transition-all duration-200
                                ${isOpen
                                    ? 'border border-accent/30'
                                    : 'border border-border hover:border-accent/22'
                                }`}
                        >
                         
                            <button
                                onClick={() => toggle(i)}
                                className='w-full flex items-center justify-between gap-3 px-5 py-[18px] text-left bg-transparent border-none cursor-pointer'
                            >
                                <span className={`text-[14px] font-semibold leading-snug transition-colors duration-150 ${isOpen ? 'text-accent-soft' : 'text-text-primary'}`}>
                                    {faq.q}
                                </span>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200
                                    ${isOpen
                                        ? 'bg-accent-deep/25 border border-accent/30'
                                        : 'bg-accent-deep/12 border border-accent/14'
                                    }`}
                                >
                                    <Plus
                                        size={13}
                                        className={`text-accent-soft transition-transform duration-250 ${isOpen ? 'rotate-45' : ''}`}
                                    />
                                </div>
                            </button>

                            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className='overflow-hidden'>
                                    <p className='text-[13px] text-text-secondary leading-relaxed px-5 pb-5 pt-3 border-t border-border'>
                                        {faq.a}
                                    </p>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>

        </section>
    )
}