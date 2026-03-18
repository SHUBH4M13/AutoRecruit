import React from 'react'

import Navbar from '../Components/Navbar'
import LandingPage from '../Components/LandingPage'
import FeatureSection from '../Components/FeatureSection'
import Timeline from '../Components/Timeline'

export default function Home() {
  return (
    <>
        <Navbar/>
        <LandingPage/>
        <FeatureSection/>
        <Timeline/>
    </>
  )
}
