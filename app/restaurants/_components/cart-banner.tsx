"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id
  );

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3">
      {products.length > 0 && restaurantHasProductsOnCart ? (
        <div className="flex justify-between items-center">
          {/* PRECO */}
          <div>
            <span className="text-sm text-muted-foreground">
              Total sem entrega
            </span>
            <h3 className="font-semibold">
              {formatCurrency(totalPrice)}{" "}
              <span className="text-xs text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </h3>
          </div>
          {/* BOTAO */}

          <Sheet>
            <SheetTrigger>
              <Button className="bg-[#EA1D2C]">Ver sacola</Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw]">
              <SheetHeader>
                <SheetTitle className="text-left">Sacola</SheetTitle>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Adicione itens ao carrinho para ver o total
        </p>
      )}
    </div>
  );
};

export default CartBanner;
