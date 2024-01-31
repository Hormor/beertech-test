import { fetchProducts } from '@/services/apiHandler'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Cart from '@/svg/Cart'

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const handleSearch = (search: string) => {
    const res = products.filter((product) => {
      return product.title.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
    setFilteredProducts(res)
  }

  const handleSelect = (select: string) => {
    if (select !== "lowToHigh" && select !== "highToLow") {
      return
    }
    const result = [...products].sort((a, b) => {
      return select === "lowToHigh" ? a.price - b.price : b.price - a.price
    })
    console.log(result)
    setProducts(result)
  }
  
  const getProducts = async () => {
    const res = await fetchProducts()
    setProducts(res)
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className='max-w-screen-xl mx-auto my-24'>
      <div className='flex justify-between'>
       <div className='relative w-full'>
        <svg className="absolute -translate-y-1/2 top-1/2 left-3 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
       <input
          type="search"
          name="search" 
          id="search" 
          placeholder='Search by name'
          className='border border-green-500 rounded-lg w-1/2 shadow-sm px-8 py-2'
          onChange={(e) => handleSearch(e.target.value)}
        />
       </div>
        <div className='flex justify-between space-x-10'>
        <select 
          name="select"
          id="select" 
          className='border border-green-500 rounded-lg px-4 py-px'
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="sort">Sort by: Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
         <button> <Cart/> </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 my-10">
        {(filteredProducts.length ? filteredProducts : products).map((product, i) => (
          <div
            key={i}
            className="relative max-md:flex max-sm:gap-3 sm:gap-1 max-md:px-0 cursor-pointer rounded-[20px] pt-3 pb-10 px-3 bg-[#fff] shadow-[0_1px_5px_0px_rgba(16,24,40,0.5)] max-md:shadow-[0_0px_0px_0px_#fff]"
          >
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
                <p className="py-2 px-2 rounded-lg text-center bg-green-500 text-white">
                <button>ADD TO CART</button>
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
