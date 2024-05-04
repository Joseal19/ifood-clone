"use client";

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;

  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantify, setQuantify] = useState(1);
  const { addProductToCart, products } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCartClick = () => {
    addProductToCart(product, quantify);
    setIsCartOpen(true);
  };

  const handleCreaseQuantifyClick = () =>
    setQuantify((currentState) => currentState + 1);
  const handleDecreaseQuantifyClick = () =>
    setQuantify((currentState) => {
      if (currentState === 1) return currentState;
      return currentState - 1;
    });

  return (
    <>
      <div className="z-50 relative mt-[-2.0rem] py-5 mt-[-5px] rounded-tl-3xl rounded-tr-3xl bg-white">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-[0.375rem] px-5">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-sx text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        {/* NOME DO PRODUTO */}
        <h1 className="text-xl font-semibold mb-2 mt-1 px-5">{product.name}</h1>

        {/* PRECO DO PRODUTO */}
        <div className="flex justify-between px-5">
          {/* PRECO COM DESCONTO */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {/* PRECO ORIGINAL */}
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          </div>
          {/* QUANTIDADE */}
          <div className="flex gap-3 items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border hover:bg-[#EA1D2C] border-solid border-muted-foreground"
              onClick={handleDecreaseQuantifyClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantify}</span>
            <Button
              size="icon"
              variant="ghost"
              className="border hover:bg-[#EA1D2C]  border-solid border-muted-foreground"
              onClick={handleCreaseQuantifyClick}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 space-y-3 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3 px-5">
          <h3 className="font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>
        <div className="px-5 mt-6">
          <Button
            className="w-full font-semibold bg-[#EA1D2C]"
            onClick={handleAddToCartClick}
          >
            Adicionar à Sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductDetails;
