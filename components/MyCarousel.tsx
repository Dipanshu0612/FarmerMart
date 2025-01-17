"use client"

import {useRef} from "react";
import { CarouselItems } from "@/app/utils/CarouselItems";
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
      className="w-[50rem] bg-transparent"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {CarouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative" style={{ height: "45rem" }}>
              <Card className="bg-transparent">
                <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                  <Image
                    src={item}
                    alt="Carousel"
                    layout="fill"
                    objectFit="cover"
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
}
