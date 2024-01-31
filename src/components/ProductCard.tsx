import { Product } from "@/pages";
import Image from "next/image";
import { useState } from "react";

type Props = {
  product: Product;
  onAddToCart: (quantity: number) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleClick = () => { 
    if (quantity < 1) {
      return
    }
    setShow(false);
    onAddToCart(quantity);
    setQuantity(0);
  };

  return (
    <div className="relative max-md:flex max-sm:gap-3 sm:gap-1 max-md:px-1 cursor-pointer rounded-[20px] pt-3 pb-20 lg:pb-10 px-3 bg-white shadow-[0_1px_5px_0px_rgba(16,24,40,0.5)]">
      <Image
        className="w-full h-48 rounded-xl max-md:w-2/6 max-md:h-auto max-md:rounded object-contain"
        alt="property picture"
        src={product.image}
        width={100}
        height={100}
      />
      <div className="w-full">
        <div className="flex justify-between items-center mt-2 mb-2 max-sm:mt-0 max-sm:mb-0 font-semibold text-lg">
          <h1 className="text-[#3E3D5B] leading-none max-w-72 mt-3">
            {product.title}
          </h1>
          <div>${product.price}</div>
        </div>
        <p className="text-sm mt-1 mb-10 max-sm:my-2 text-gray-400 h-[60px] overflow-hidden">
          {product.description}
        </p>
        <div className="absolute bottom-3 inset-x-3 flex justify-between">
          <p className="py-2 px-2 rounded-lg text-center bg-[#F0FDF4]">
            {product.category}
          </p>
          <button
            className="py-2 px-2 rounded-lg text-center bg-green-500 text-white"
            onClick={() => setShow(true)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      {show && (
        <div className="absolute inset-0 bg-black/70 grid place-items-center">
          <div
            className="absolute inset-0"
            onClick={() => setShow(false)}
          ></div>
          <div className="absolute flex space-x-4 justify-center">
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={0}
              placeholder="Quantity"
              value={quantity}
              className="border border-green-500 rounded-lg w-1/2 shadow-sm px-4 py-2"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="py-2 px-2 rounded-lg text-center bg-green-500 text-white disabled:cursor-not-allowed"
              onClick={handleClick}
              disabled={quantity < 1}
            >
              CONFIRM
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
