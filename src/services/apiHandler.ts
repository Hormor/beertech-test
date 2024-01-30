import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/"  
})

export const fetchProducts = async () => {
  const res = await axiosInstance.get("products")
  return res.data
}