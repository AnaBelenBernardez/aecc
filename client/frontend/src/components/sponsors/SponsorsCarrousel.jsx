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
import Image from 'next/image';

const SponsorsCarrousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const { sponsors, loading, error } = useGetAllSponsors();
  console.log(sponsors);

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
          { !sponsors ? null 
          : Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-2/6 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex sm:aspect-square items-center justify-center p-6">
                    <article>
                      <div>
{/*                         <Image src={} width={200} height={100} alt='Logo patrocinadores'/>
 */}                      </div>
                    </article>
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

export default SponsorsCarrousel;