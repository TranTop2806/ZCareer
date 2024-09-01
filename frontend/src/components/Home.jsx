import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategryCarousel from './CategryCarousel'
import LastestJobs from './LastestJobs'
import Footer from './shared/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategryCarousel/>
        <LastestJobs/>
        <Footer /> 
    </div>
  )
}

export default Home 