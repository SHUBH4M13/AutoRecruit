import React from 'react'

import Navbar from '../Components/Navbar'
import LandingPage from '../Components/LandingPage'
import FeatureSection from '../Components/FeatureSection'
import Timeline from '../Components/Timeline'
import FAQSection from '../Components/Faqs'
import Footer from '../Components/Footer'

export default function Home() {
  return (
    <div className=' overflow-hidden min-w-full '>
        <div className=' overflow-hidden absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-accent-deep/10 blur-3xl pointer-events-none' />
        <Navbar/>
        <LandingPage/>
        <FeatureSection/>
        <Timeline/>
        <FAQSection/>
        <Footer/>
        <div className=' overflow-hidden absolute bottom-[-60px] left-[-120px] w-[240px] h-[240px] rounded-full bg-accent-deep/10 blur-3xl pointer-events-none' />

    </div>
  )
}
