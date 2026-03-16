import LandingPage from "../src/Components/LandingPage"
import Navbar from "./Components/Navbar"
import FeatureSection from "./Components/FeatureSection"
import HowitWorksSection from "./Components/Timeline"

function App() {

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <LandingPage />
      <FeatureSection />
      <HowitWorksSection/>
    </div>

  )
}

export default App
