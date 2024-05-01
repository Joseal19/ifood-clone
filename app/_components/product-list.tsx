import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";


interface ProductListProps {
    products: Prisma.ProductGetPayload<{
        include: {
          restaurant: {
            select: {
              name: true;
            };
          };
        };
      }>[];
}

const ProductList = async ({products}: ProductListProps) => {
  return (
    // esconde o scroll [&::-webkit-scrollbar]:hidden
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
