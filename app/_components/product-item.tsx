import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductItemsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}
const ProductItem = ({ product, className }: ProductItemsProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn("space-y-2 w-[150px] min-w-[150px]", className)}
    >
      <div className="space-y-2 w-full">
        {/* IMAGE*/}
        <div className="aspect-square w-full relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-md"
          />

          {product.discountPercentage && (
            <div className="absolute flex gap-[2px] top-2 left-2 bg-[#EA1D2C] py-[2px] px-2 items-center rounded-full text-white">
              <ArrowDownIcon size={12} />
              <span className="font-semibold text-xs">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
        {/* TITULO, PREÇO E RESTAURANTE*/}
        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex gap-1 items-center">
            <h3 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="line-through text-[#7E8392] text-xs">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-xs truncate">
            {product.restaurant.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
