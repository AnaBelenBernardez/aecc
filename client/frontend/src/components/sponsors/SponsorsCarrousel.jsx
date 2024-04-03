import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from '../../components/loading/Loading';
import useGetAllSponsors from '../../hooks/useGetAllSponsors';
import SponsorsCard from './SponsorsCard';
import { setLenghtCarrouselFunc } from '../../lib/helpers';

const SponsorsCarrousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [lengthCarrousel, setLengthCarrousel] = React.useState();
  const { sponsors, loading, error } = useGetAllSponsors();

  React.useEffect(() => {
    if(sponsors) {
      setLengthCarrousel(setLenghtCarrouselFunc(sponsors, sponsors.length));
    }
  }, [sponsors]);

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
        className="max-w-64 md:max-w-xl lg:max-w-7xl flex items-center max-xl:landscape:max-w-[55rem] max-md:landscape:max-w-[34rem]"
      >
        <CarouselContent className="lg:flex">
          { !sponsors ? null 
          : Array.from({ length: lengthCarrousel }).map((_, index) => {
            return (
              <CarouselItem key={index} className="md:basis-2/6 lg:basis-1/3 flex gap-4 min-w-[250px] shrink mx-5 md:mx-9">
                <Card className="w-[250px]">
                  <CardContent className="flex justify-center p-6 w-[250px]">
                    <SponsorsCard
                      logo={sponsors[index].logo}
                      name={sponsors[index].name}
                      description={sponsors[index].description}
                      link={sponsors[index].link}
                      important={sponsors[index].important}
                    />
                  </CardContent>
                </Card>
            </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SponsorsCarrousel;