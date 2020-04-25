import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "DEFAULT Title";
  const cardDesc = product ? product.description : "DEFAULT Desc";
  const cardPrice = product ? product.price : "DEFAULT";

  const addProductToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) return <Redirect to="/cart" />;
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addProductToCart}
          className="btn btn-block rounded btn-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-danger rounded mt-2 mb-2"
        >
          Remove
        </button>
      )
    );
  };

  const showQuantity = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="row">
          <button className="col-2 btn btn-primary rounded mt-2 mb-2 mr-2 lead">
            +
          </button>
          <button className="col-2 btn btn-block rounded btn-success mt-2 mb-2 mr-2 lead">
            {count}
          </button>
          <button className="col-2 btn btn-warning rounded btn-block mt-2 mb-2 lead">
            -
          </button>
        </div>
      )
    );
  };
  return (
    <div className="card text-white border border-white">
      <div className="card-body">
        <ImageHelper product={product} />
        {/* <h5 className="card-title">{cardTitle}</h5> */}
        <p className="lead font-weight-normal text-wrap">{cardDesc}</p>
        <p className="btn btn-info rounded  btn-sm px-4">&#8377; {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-6">{showRemoveFromCart(removeFromCart)}</div>
          <div className="col-6">{showQuantity(removeFromCart)}</div>
          {getRedirect(redirect)}
        </div>
      </div>
    </div>
  );
};

export default Card;
