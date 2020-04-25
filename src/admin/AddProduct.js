import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategory, addProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategory()
      .then((data) => {
        if (data.error) setValues({ ...values, error: data.error });
        else
          setValues({ ...values, categories: data, formData: new FormData() });
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    addProduct(user._id, token, formData).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else {
        console.log(data);
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const message = () => {
    if (createdProduct)
      return (
        <h4 className="alert alert-success mt-3">
          {createdProduct} added Successful
        </h4>
      );
    if (error)
      return <h4 className="alert alert-danger mt-3">Product Not Added</h4>;
  };

  const createProductForm = () => (
    <form className="m-4">
      <div className="form-group">
        <label className="btn btn-block rounded btn-info">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="Upload Image"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-block rounded btn-success mb-3 lead"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base>
      <Link
        to="/admin/dashboard"
        className="btn btn-lg btn-warning rounded mb-3"
      >
        Admin Home
      </Link>
      <div className="row">
        <div className="col-md-6 bg-dark rounded offset-md-3 justify">
          {message()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
