import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ProductList from "../components/ProductList";

function Cart() {
    const { cart, setCart } = useContext(UserContext);
    const totalCtx = useContext(UserContext);
    const total = totalCtx.getTotal();
  return (
    <div>
      <h1 className="text-center mb-4">Cart</h1>
      <h4 class="ms-5 mb-1">Total : $ { total }</h4>
      <ProductList products={cart} />
    </div>
  );
}

export default Cart;
