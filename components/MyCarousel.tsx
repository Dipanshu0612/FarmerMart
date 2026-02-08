"use client";

import { useRef } from "react";
import { CarouselItems } from "@/utils/CarouselItems";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export function MyCarousel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[50rem] bg-transparent mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {CarouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative w-full h-[12rem] sm:h-[18rem] md:h-[24rem] lg:h-[32rem]">
              <Card className="bg-transparent h-full w-full">
                <CardContent className="flex items-center justify-center p-0 relative h-full w-full overflow-hidden">
                  <Image
                    src={item}
                    alt="Carousel"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50rem"
                    loading="lazy"
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 sm:-left-12" />
      <CarouselNext className="right-2 sm:-right-12" />
    </Carousel>
  );
}
