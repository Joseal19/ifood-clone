import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "../_components/product-image";
import ProductDetails from "../_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
    take: 3,
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={product} />

      {/* TITULO, PREÇO */}
      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
