"use client"

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import useGetAllExperiences from '../../../hooks/useGetAllExperiences';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardPerson } from "../..";
import { setLenghtCarrouselFunc } from '../../../lib/helpers';
import { useEffect } from 'react';
import Loading from '../../loading/Loading';

export const PersonsCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [lengthCarrousel, setLengthCarrousel] = React.useState();
  const {experiences, loading, error} = useGetAllExperiences();

  useEffect(() => {
    setLengthCarrousel(setLenghtCarrouselFunc(experiences, 3));
  }, [experiences]);

  if (loading) return <Loading/>;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      className="w-full max-w-sm md:max-w-4xl lg:max-w-7xl"
    >
      <CarouselContent>
        { loading ? <Loading/> 
        : Array.from({ length: lengthCarrousel }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center sm:justify-start p-6">
                  <CardPerson
                    name={experiences[index].name}
                    content={experiences[index].content}
                    image={experiences[index].photo}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
