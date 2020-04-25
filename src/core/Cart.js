import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProduct = (products) => {
    return (
      <div>
        {products &&
          products.map((product, index) => {
            return (
              <div key={index} className="m-2">
                <Card
                  product={product}
                  addToCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <Base>
      <div className="row text-center">
        <div className="col sm-6">
          {products.length > 0 ? (
            loadAllProduct(products)
          ) : (
            <h3> No products in Cart</h3>
          )}
        </div>
        <div className="row text-center">
          <div className="sm-6 m-2">
            <StripeCheckout products={products} setReload={setReload} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
