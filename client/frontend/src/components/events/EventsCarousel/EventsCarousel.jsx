import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { initialEvents } from "@/mockup/events";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardEvent } from "../..";
const events = initialEvents;

export const EventsCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        className="max-w-sm sm:max-w-7xl"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-2/6 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex sm:aspect-square items-center justify-center p-6">
                    <CardEvent
                      title={events[index].title}
                      image={events[index].image}
                      description={events[index].description}
                      location={events[index].location}
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
    </div>
  );
};
