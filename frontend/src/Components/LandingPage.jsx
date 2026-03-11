import React from 'react'
import { Sparkles } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className='text-center flex flex-col justify-center items-center gap-6'>

            <div className='flex gap-5 bg-black justify-center items-center h-[42px] w-78 rounded-3xl '>

                <Sparkles color='white'/>

                <div className='text-white text-center '>
                    <p>AI-Powered Career Platform</p>
                </div>

            </div>

            <div className=''>
                <p className=' text-6xl font-bold text-black '>AI-Powered Resume Analysis</p>
                <p className=' text-6xl font-bold text-secondaryaccent '>& Job Matching</p>
            </div>

            <div className=' text-mutedtext'>
                <p>Transform your job search with intelligent resume analysis and personalized <br /> job recommendations. Let AI help you land your dream job faster.</p>
            </div>

        </div>
    )
}
