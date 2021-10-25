import React from 'react'
import { useContext, useState, useEffect} from 'react/cjs/react.development'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

function ProductItem(props) {
    const { cart, setCart } = useContext(UserContext);
    const propIdUrl = '/product/' + props.id
    const ctxCheck = useContext(UserContext)
    const isItem = ctxCheck.checkT(props.id)

    const removeFromCart = () => {
        const newCart = cart.filter((item) => item.id !== props.id)
        setCart(newCart)
    }

    const addTocart = () => {
        setCart([...cart, props])
    }
    
    return (
        <div className="col-12 col-sm-6 col-md-4">
            <div className="p-3 text-center card category-card">
                <p className="card-body p-1 text-center">Category: { props.category }</p>
                <p className='card-body p-1'><img src={props.image} alt="" /></p>
                <p className="card-body text-center p-1">${ props.price }</p>
                <p className="card-header text-center"><Link to={propIdUrl} className="nav-link active" aria-current="page">
                {props.title}
                </Link>
                </p>
                {/* <p className="card-header text-center">{props.description}</p> */}
                {isItem ? <button className='btn-secondary mt-2 py-2 border-0' onClick={removeFromCart}>Remove from cart</button> : <button className='btn-success mt-2 py-2 border-0' onClick={addTocart}>Add to cart</button>}
            </div>
        </div>
    )
}

export default ProductItem;
