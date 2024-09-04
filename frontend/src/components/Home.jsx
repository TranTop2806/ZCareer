import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategryCarousel from './CategryCarousel'
import LastestJobs from './LastestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  },[]);
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