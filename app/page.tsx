import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: { select: { name: true } },
    },
  });

  return (
    <>
      <div className="px-5 pt-6">
        <Header />
      </div>
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza."
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="px-5 flex items-center justify-between">
          <h2>Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 text-[#EA1D2C] hover:bg-transparent h-fit"
            asChild
          >
            <Link href="/products/recommended">Ver todos</Link>
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="Apartir de R$ 17,90 em lanches."
        />
      </div>
      <div className="space-y-4 py-6">
        <div className="px-5 flex items-center justify-between">
          <h2>Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 text-[#EA1D2C] hover:bg-transparent h-fit"
            asChild
          >
            <Link href="/restaurants/recommended"></Link>
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
