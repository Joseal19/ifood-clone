import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import RestaurantList from "@/app/_components/restaurant-list";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurant = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
      </div>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
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

export default RecommendedRestaurant;
