import { fetchProducts } from "@/services/apiHandler";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import ProductCard from "@/components/ProductCard";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(0);

  const handleSearch = (search: string) => {
    const res = products.filter((product) => {
      return product.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
    setFilteredProducts(res);
  };

  const handleSelect = (select: string) => {
    if (select !== "lowToHigh" && select !== "highToLow") {
      return;
    }
    const result = [...products].sort((a, b) => {
      return select === "lowToHigh" ? a.price - b.price : b.price - a.price;
    });
    console.log(result);
    setProducts(result);
  };

  const getProducts = async () => {
    const res = await fetchProducts();
    setProducts(res);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="mb-24">
      <div className="sticky top-0 z-10 bg-white shadow-md py-5">
        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 flex justify-between">
          <div className="relative w-full">
            <svg
              className="absolute -translate-y-1/2 top-1/2 left-3 w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search by name"
              className="border border-green-500 rounded-lg w-full lg:w-1/2 shadow-sm pl-8 py-2.5"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex justify-between space-x-1 lg:space-x-10">
            <select
              name="select"
              id="select"
              className="border border-green-500 rounded-lg px-2 sm:px-4 py-px w-28 sm:w-auto mx-4"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="sort">Sort by: Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
            <Cart count={quantity} />
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-4 lg:gap-8 my-10">
        {(filteredProducts.length ? filteredProducts : products).map(
          (product, i) => (
            <ProductCard
              key={i}
              product={product}
              onAddToCart={(e) => setQuantity(quantity + e)}
            />
          )
        )}
      </div>
    </div>
  );
}
