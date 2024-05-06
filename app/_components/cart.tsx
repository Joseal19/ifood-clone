import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="p-5 space-y-2">
                <div className="justify-between itemss-center flex text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subTotalPrice)}</span>
                </div>
                <Separator />
                <div className="justify-between itemss-center flex text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrency(totalDiscount)}</span>
                </div>
                <Separator className="h-[0.5px]" />

                <div className="justify-between itemss-center flex text-xs">
                  <span className="text-muted-foreground">Entrega</span>
                  <span>
                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary text-[#EA1D2C]">
                        Grátis
                      </span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee)
                      )
                    )}
                  </span>
                </div>
                <Separator />

                <div className="justify-between itemss-center flex text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-6 w-full bg-[#EA1D2C]">Finalizar Pedido</Button>
        </>
      ) : (
        <h2 className="font-medium text-center">Sua sacola está vazia.</h2>
      )}
    </div>
  );
};

export default Cart;
