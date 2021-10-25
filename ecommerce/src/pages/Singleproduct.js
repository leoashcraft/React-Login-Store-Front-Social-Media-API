import React, {useState, useEffect } from 'react'
import axios from 'axios';
function Singleproduct(props) {
    console.log(props)
    const { id } = props.match.params
    const [isloading, setIsLoading] = useState(true);
    const [loadedProduct, setLoadedProduct] = useState({});

    const getProduct = (num) => {
        axios.get(`https://fakestoreapi.com/products/${num}`).then((response) => {
          console.log(response.data)
          const product = response.data
          setIsLoading(false)
          setLoadedProduct(product)
          console.log("Product is", product)
        });
    }
    
    useEffect(() => {
        setIsLoading(true)
        getProduct(id);
      }, []);

    if (isloading) {
        return <section>
            <p>Loading...</p>
        </section>
    }
    return (
        <div className="row g-2 mt-5">
        <div className="col-12 col-sm-12 col-md-6">
                <div className="p-3 text-center">
                    <p><img className='w-100 single-img' src={loadedProduct.image} alt="..." /></p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
                <div className="p-3 text-center card category-card">
                    <p className="card-body text-center p-1">Category: { loadedProduct.category }</p>
                    <p className="card-header text-center p-1">{ loadedProduct.title }</p>
                    <p className="card-body text-center text-dark fw-bold p-1">$ { loadedProduct.price }</p>

                    <p className="card-body text-start p-1"> { loadedProduct.description }</p>
                    <p className=""></p>
                </div>
            </div>
        
        </div>
    )
}

export default Singleproduct
