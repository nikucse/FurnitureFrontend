import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProduct, deleteProduct } from "./helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProduct().then((data) => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base>
      <Link
        className="btn btn-lg btn-warning rounded m-3"
        to={`/admin/dashboard`}
      >
        <span className="lead">Admin Home</span>
      </Link>
      <div className="row bg-dark">
        <div className="col-md-12 col-sm-6">
          <h2 className="text-center text-white my-3">Total products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-2">
                  <h4 className="lead text-white text-left">{product.name}</h4>
                </div>
                <div className="col-2">
                  <h4 className="lead text-white text-left">
                    &#8377; {product.price}
                  </h4>
                </div>
                <div className="col-3">
                  <ImageHelper product={product} />
                </div>
                <div className="col-2">
                  <Link
                    className="btn btn-success btn-block rounded"
                    to={`/product/update/${product._id}`}
                  >
                    Update
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-block rounded btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
