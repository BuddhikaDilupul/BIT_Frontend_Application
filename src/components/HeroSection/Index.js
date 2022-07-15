import React from 'react'
import { HeroBg, HeroContainer, BannerBg } from './HeroElement'
import Banner from '../Banner/Banner.jpg'
function HeroSection() {
  return (
    <HeroContainer>
      <HeroBg>
        {/* <img src={Banner} alt='image'/> */}
        <BannerBg autoPlay loop muted src={Banner} type="image/jpg" />
      </HeroBg>
    </HeroContainer>
  )
}

export default HeroSection
