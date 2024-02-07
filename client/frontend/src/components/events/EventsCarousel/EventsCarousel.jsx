import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import useGetAllEvents from "../../../hooks/useGetAllEvents";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardEvent } from "../..";
import { setLenghtCarrouselFunc } from '../../../lib/helpers';
import Loading from '../../loading/Loading';

export const EventsCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [lengthCarrousel, setLengthCarrousel] = React.useState();
  const {events, loading, error} = useGetAllEvents();

  React.useEffect(() => {
    setLengthCarrousel(setLenghtCarrouselFunc(events, 8));
  }, [events]);

  if (loading) return <Loading/>;

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
          { !events ? null 
          : Array.from({ length: lengthCarrousel }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-2/6 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex sm:aspect-square items-center justify-center p-6">
                    <CardEvent
                      title={events[index].title}
                      image={events[index].event_photos[0]}
                      description={events[index].content}
                      location={events[index].location}
                      link={events[index].link}
                      warning={events[index].warning}
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
