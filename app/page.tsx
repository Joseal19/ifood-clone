import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

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
        <Search />

        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza."
          width={0}
          height={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="px-5 flex items-center justify-between">
          <h2>Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="p-0 text-[#EA1D2C] hover:bg-transparent h-fit"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products}/>
      </div>
    </>
  );
};

export default Home;
