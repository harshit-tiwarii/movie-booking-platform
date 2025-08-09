import React from 'react'
import Hero from '../component/Hero'
import FeaturedSection from '../component/Featured'
import Trailer from '../component/Trailer'

function Homepage() {
  return (
    <div>
        <Hero />
      <div className='page-container'>
        <FeaturedSection />
        <Trailer />
      </div>
    </div>
  )
}

export default Homepage