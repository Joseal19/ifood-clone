import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      {/* IMAGE */}
      <div className="w-full h-[136px] relative">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover rounded-lg shadow-md"
        />
        <div className="absolute flex gap-[2px] top-2 left-2 bg-[#EA1D2C] py-[2px] px-2 items-center rounded-full text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-xs"> 5.0</span>
        </div>

        <Button
          size="icon"
          className=" absolute top-2 right-2 bg-gray-700 rounded-full h-7 w-7"
        >
          <HeartIcon size={16} className="fill-white" />
        </Button>
      </div>
      {/* TEXT */}
      <div>
        <h3 className="font-semibold text-sm ">{restaurant.name}</h3>
        {/* INFORMACOES D ENTREGA */}
        <div className="flex gap-3">
          {/* CUSTO DE ENTREGA */}
          <div className="flex gap-1 items-center">
            <BikeIcon className="text-[#EA1D2C]" size={20} />
            <span className="text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          {/* TEMPO DE ENTREGA */}
          <div className="flex gap-1 items-center">
            <TimerIcon className="text-[#EA1D2C]" size={20} />
            <span className="text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
