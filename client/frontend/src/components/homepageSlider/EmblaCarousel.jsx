import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  DotButton
} from './EmblaCarouselArrowsDotsButtons'
import Image from 'next/image'
import { useLanguageStore } from '../../store/language/language.store'
import Link from 'next/link'

const EmblaCarousel = (props) => {
  const language = useLanguageStore((state) => state.language);
  const { slides, options, banners } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {banners.map((banner, index) => (
              <div className="embla__slide relative" key={index}>
                <div
                 className="w-full bg-cover bg-center sm:bg-cover h-[380px] sm:h-[480px] bg-no-repeat flex sm:items-center justify-start"
                id="top"
                  style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BACK_URL + `/uploads/${banner?.photo}`})` }}
                  >
              <div className="ml-5 mt-5 md:ml-12 lg:ml-32">
                 <h1 className="font-bold text-3xl sm:text-6xl text-primaryGreen max-w-2xl">
                  {language === "es" ? (banner?.title !== "null" ? banner?.title : null) : (banner?.galician_title !== "null" ? banner?.galician_title : null)}
                  </h1>
                  <p className="text-xs sm:text-xl font-medium my-5 text-primaryGreen">
            {language === "es"
              ? (banner?.subtitle !== "null" ? banner?.subtitle : null)
              : (banner?.galician_subtitle !== "null" ? banner?.galician_subtitle : null)}
                    </p>
                   { banner?.button_link && ((banner?.button_text !== "null" && banner?.button_text !== null && banner?.button_text !== "" ? true : false) || (banner?.galician_button_text !== "null" && banner?.galician_button_text !== null && banner?.galician_button_text !== "" ? true : false )) &&  <button className="border-2 border-primaryGreen bg-primaryGreen rounded-3xl text-sm font-bold sm:px-16 px-10 sm:py-4 py-2 mt-5 hover:text-primaryBlack hover:bg-secondLightGray hover:border-primaryGreen uppercase">
            <Link target={banner?.button_link.includes("https") ? "_blank" : "_self"} className="w-full" href={banner?.button_link}>{language === "es" ? banner?.button_text : banner?.galician_button_text}</Link>
          </button>}
                 </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </>
  )
}

export default EmblaCarousel


