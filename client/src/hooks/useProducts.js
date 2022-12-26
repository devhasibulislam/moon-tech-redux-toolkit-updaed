import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  return products;
};

export default useProducts;
