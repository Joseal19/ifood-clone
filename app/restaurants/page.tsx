"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import RestaurantItem from "../_components/restaurant-item";
import Header from "../_components/header";
import { searchForRestaurants } from "./_actions/search";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
      </div>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex flex-col w-full gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
