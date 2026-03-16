import React from 'react'
import FeatureBox from "../Components/FeatureBox"
import { ScrollText, Search, Bot, Target } from "lucide-react"

const data = [
    {
        icon: ScrollText,
        title: "Resume Analysis",
        content: "AI-powered analysis of your resume to identify strengths and areas for improvement."
    },
    {
        icon: Search,
        title: "Smart Job Search",
        content: "Intelligent job matching based on your skills, experience, and career goals."
    },
    {
        icon: Bot,
        title: "AI Resume Suggestions",
        content: "Get personalized recommendations to optimize your resume for better results."
    },
    {
        icon: Target,
        title: "Personalized Job Matches",
        content: "Discover opportunities tailored specifically to your unique profile and preferences."
    }
]

export default function FeatureSection() {
    return (
        <div className='w-full flex flex-col gap-4 justify-center items-center bg-bg  '>
            <p className=' text-[52px] font-bold'>Powerful Features for Your Success</p>
            <p className=' text-text-secondary text-center  max-w-xl leading-relaxed relative '>
                Everything you need to optimize your job search and land your dream role
            </p>

            <div className=' p-10 grid grid-cols-2 gap-10 ' >

                {
                    data.map((item, index) => (
                        <FeatureBox
                            icon={item.icon}
                            title={item.title}
                            content={item.content}
                        />
                    ))
                }
            </div>

        </div>
    )
}
