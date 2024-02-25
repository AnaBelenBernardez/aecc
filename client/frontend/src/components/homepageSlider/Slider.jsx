import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import './css/sandbox.css'
import './css/embla.css'

const OPTIONS = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Slider = ({banners}) => (
  <div className="sandbox">
    <section className="sandbox__carousel relative">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} banners={banners}/>
    </section>
  </div>
)

export default Slider