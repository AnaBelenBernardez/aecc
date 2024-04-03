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
import { setLenghtCarrouselFunc } from "../../../lib/helpers";
import Loading from "../../loading/Loading";
import { useLanguageStore } from "../../../store/language/language.store";

export const EventsCarousel = ({ filteredEvents }) => {
  const language = useLanguageStore((state) => state.language);
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [lengthCarrousel, setLengthCarrousel] = React.useState();
  const { events, loading, error } = useGetAllEvents();

  React.useEffect(() => {
    setLengthCarrousel(setLenghtCarrouselFunc(events, events.length));
  }, [events]);

  if (loading) return <Loading />;

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: filteredEvents?.length !== events.length ? false : true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        className="max-w-xs md:max-w-2xl lg:max-w-6xl "
      >
        <CarouselContent>
          {filteredEvents && filteredEvents.length > 0
            ? filteredEvents.map((_, index) => (
                <CarouselItem
                  key={index}
                  className=" md:basis-2/6 lg:basis-1/3"
                >
                  <div className="lg:border-primaryLightGrey lg:border">
                    <Card className="border-none">
                      <CardContent className="flex items-center justify-center py-6">
                        <CardEvent
                          title={
                            language === "es"
                              ? filteredEvents[index].title
                              : filteredEvents[index].galician_title
                          }
                          image={filteredEvents[index].event_photos ? filteredEvents[index].event_photos[0] : false}
                          description={
                            language === "es"
                              ? filteredEvents[index].content
                              : filteredEvents[index].galician_content
                          }
                          location={filteredEvents[index].location}
                          date={filteredEvents[index].date_start}
                          link={filteredEvents[index].link}
                          warning={filteredEvents[index].warning}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : Array.from({ length: lengthCarrousel }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-2/6 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex sm:aspect-square items-center justify-center py-6">
                        <CardEvent
                          title={
                            language === "es"
                              ? events[index].title
                              : events[index].galician_title
                          }
                          image={events[index].event_photos[0]}
                          description={
                            language === "es"
                              ? events[index].content
                              : events[index].galician_content
                          }
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
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
};
