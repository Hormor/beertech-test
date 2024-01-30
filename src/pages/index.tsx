import { fetchProducts } from "@/services/apiHandler";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const getProducts = async() => {
    const res = await fetchProducts()
    setProducts(res)
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
   <div className="grid grid-cols-3 gap-8 max-w-screen-xl mx-auto my-24">
    {products.map((product, i) => (
      <div key={i}
      className="max-md:flex max-sm:gap-3 sm:gap-1 max-md:px-0 cursor-pointer rounded-[20px] py-3 px-3 bg-[#fff] shadow-[0_1px_5px_0px_rgba(16,24,40,0.5)] max-md:shadow-[0_0px_0px_0px_#fff]"

    >
      <Image
        className="w-full h-48 rounded-xl max-md:w-2/6 max-md:h-auto max-md:rounded object-contain"
        alt="property picture"
        src={product.image}
        width={100}
        height={100}
      />
      <div className="w-full">
        <div className="flex w-full justify-between mt-2 mb-2 max-sm:mt-0 max-sm:mb-0">
          <h1 className="font-medium text-lg text-[#3E3D5B] leading-none">
            {product.title}
          </h1>

          <div>
            {product.price}
          </div>
        </div>
        <p className="text-sm text-[#3E3D5B] my-3 max-sm:my-2">
          {product.description}
        </p>
        <div className="flex justify-between">
        <p className="py-2 px-2 rounded-lg text-center bg-[#F0FDF4]">
              {product.category}
            </p>
            <p className="py-2 px-2 rounded-lg text-center bg-[#F0FDF4]">
              {product.rating.rate}
            </p>
        </div>
      </div>
    </div>
    ))}
   </div> 
  );
}
