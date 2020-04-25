import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "./helper/CartHelper";
import StripeCheckoutPkg from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    return products.reduce((amount, product) => {
      return amount + product.price * product.count;
    }, 0);
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    fetch(`${API}/payment/stripe`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        const orderData = {
          products: products,
          transaction_id: response.id,
          amount: response.amount,
        };
        createOrder(userId, isAuthenticated().token, orderData);
        emptyCart(() => {
          //console.log("Empty Cart");
          setReload(!reload);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showStripe = () => {
    return isAuthenticated() ? (
      <StripeCheckoutPkg
        stripeKey="pk_test_iZCVPoiMrGlFG3VTfwAX1bAc00Ne2TNYRA"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Furniture"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-block rounded btn-warning m-4">
          Check out
        </button>
      </StripeCheckoutPkg>
    ) : (
      <Link to="/login">
        <button className="btn btn-success btn-block  rounded">Log In</button>
      </Link>
    );
  };

  return (
    <div className="m-4">
      <h3 className="text-info">Total Amount &#8377; {getFinalAmount()}</h3>
      {showStripe()}
    </div>
  );
};

export default StripeCheckout;
