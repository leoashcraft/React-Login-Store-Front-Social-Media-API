import React from 'react'
import ProductItem from './ProductItem'

function ProductList(props) {
    return (
        <div className="container-fluid">
            <div className="row g-3">
                {props.products.map((product) => 
                <ProductItem key={product.id} title={product.title} image={product.image} price={product.price} description={product.description} category={product.category} id={product.id} />
                )}
            </div>
        </div>
    )
}

export default ProductList
