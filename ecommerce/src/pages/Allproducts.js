import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useState } from "react";
import ProductList from "../components/ProductList";

function Allproducts() {
    const {user} = useContext(UserContext);

    const [isloading, setIsLoading] = useState(true);
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [lenProduct, setProductLenght] = useState(0)

    const handleNext = () => {
        getProduct(5);
    }

    const handlePrevious = () => {
        getProduct(15)
    }

    const getProduct = (num) => {
        axios.get(`https://fakestoreapi.com/products?limit=${num}`).then((response) => {
          console.log(response.data)
          const products = response.data
          setIsLoading(false)
          setLoadedProducts(products)
          setProductLenght(products.length)
        });
    }
    
    useEffect(() => {
        setIsLoading(true)
        getProduct(15);
      }, []);

    if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }
  return (
    <div>
    <div className="alert alert-success p-1 m-auto mt-2 text-center">
        Welcome {user}
    </div>
    <h1 className="text-center mb-4">All products</h1>
    <ProductList products={loadedProducts} />
    <p className='text-center'>{lenProduct == 15 ?  <button className='btn-primary mt-2 border-0 px-3' onClick={handleNext}>Next</button> : <button className='btn-secondary mt-2' onClick={handlePrevious}>Previous</button>}</p>
    </div>
  );
}

export default Allproducts;
