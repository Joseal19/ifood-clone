import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantify,
    inCreaseProductQuantify,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantifyClick = () => {
    decreaseProductQuantify(cartProduct.id);
  };

  const handleInCreaseQuantifyClick = () => {
    inCreaseProductQuantify(cartProduct.id);
  };

  const handleDeleteClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGEM E INFORMACAO */}
        <div className="w-20 h-20 rounded-lg relative">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price)* cartProduct.quantity)}
              </span>
            )}
          </div>

          {/* QUANTIDADE */}
          <div className="flex gap-3 items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border hover:bg-[#EA1D2C] border-solid border-muted-foreground h-7 w-7"
            >
              <ChevronLeftIcon
                size={16}
                onClick={handleDecreaseQuantifyClick}
              />
            </Button>
            <span className="w-4 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="border hover:bg-[#EA1D2C]  border-solid border-muted-foreground h-7 w-7"
            >
              <ChevronRightIcon
                size={16}
                onClick={handleInCreaseQuantifyClick}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTAO DE  DELETAR*/}
      <Button
        size="icon"
        variant="ghost"
        className="w-8 h-8 border border-solid border-muted-foreground hover:bg-[#EA1D2C]"
        onClick={handleDeleteClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
