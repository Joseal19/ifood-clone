import { db } from "@/app/_lib/prisma";
import RestaurantImage from "../_components/restaurant-image";
import { notFound } from "next/navigation";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "../_components/cart-banner";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className=" flex items-center justify-between px-5 pt-5 z-50 relative bg-white mt-[-1.5rem] py-5 mt-[-5px] rounded-tl-3xl rounded-tr-3xl">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex gap-[3px] top-2 left-2 bg-foreground py-[2px] px-2 items-center rounded-full text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-xs"> 5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] min-h-[40px] bg-[#F4F4F4] rounded-lg text-center items-center justify-center flex"
          >
            <span className="ext-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="font-semibold px-5">Mais Pedidos</h2>
        {/* TODO : mostrar produtos mais pedidos */}
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="font-semibold px-5">{category.name}</h2>
          {/* TODO : mostrar produtos mais pedidos */}
          <ProductList products={category.products} />
        </div>
      ))}
      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
