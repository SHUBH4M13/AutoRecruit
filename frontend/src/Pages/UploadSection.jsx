import { useState } from 'react'
import { Zap, Lock} from 'lucide-react'
import ResumeDrop from "../Components/ResumeDrop"
import JdBox from '../Components/JdBox'

export default function UploadSection() {
    const [jd, setJd] = useState('')
    const isReady = jd.length > 30

    const handleAnalyse = () => {
        // wire to your API here
        console.log('Analysing:', { file, jd })
    }

    return (
        <section className='relative overflow-hidden min-h-screen bg-bg py-16 px-8'>

            <div className='text-center mb-10 relative z-10'>
                <h2 className='text-[42px] font-bold text-text-primary mb-1.5'>
                    Analyse your <span className='text-accent'>resume</span>
                </h2>
                <p className='text-[13px] text-primary'>
                    Upload your resume and paste the job description to get an instant AI-powered match score.
                </p>
            </div>

            <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-6'>

                <div>
                    <ResumeDrop/>
                </div>

                <div>
                    <JdBox/>
                </div>
                
            </div>

            <div className='relative z-10 max-w-4xl mx-auto flex items-center justify-between'>
                <div className='flex items-center gap-1.5 text-[12px] text-text-muted'>
                    <Lock size={12} className='text-text-secondary' />
                    Your data is never stored or shared
                </div>
                <button
                    onClick={handleAnalyse}
                    // disabled={!isReady}
                    className='
                        inline-flex items-center gap-2 bg-accent-deep text-text-primary
                        text-[14px] font-semibold px-7 py-3 rounded-[10px] border-none cursor-pointer
                        hover:bg-[#A21CAF] hover:shadow-[0_0_24px_rgba(232,121,249,0.22)]
                        active:scale-[0.97] transition-all duration-150
                        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent-deep disabled:hover:shadow-none
                    '
                >
                    <Zap size={15} />
                    Analyse Resume
                </button>
            </div>

        </section>
    )
}