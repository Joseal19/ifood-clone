"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "imageUrl" | "name">;
}
const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
    const router = useRouter();

    const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="object-cover"
        fill
      />
      <Button
        className="absolute top-4 left-2 rounded-full bg-white hover:text-white text-foreground"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
          size="icon"
          className=" absolute top-4 right-4 bg-gray-700 rounded-full"
        >
          <HeartIcon size={20} className="fill-white" />
        </Button>
    </div>
  );
};

export default RestaurantImage;
