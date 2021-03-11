import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DangerAlert from "./DangerAlert";
import Spinner from "./Spinner";
import SuccessAlert from "./SuccessAlert";
import Axios from "axios";
import { useParams } from "react-router";

const UpdateProduct = () => {
    const [category, setCategory] = useState([]);
  const [product_name, setProduct_name] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [product_img, setProduct_img] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  //console.log(prodImg);

  const state = useSelector((state) => state.cat);
  //console.log(state)

  const dispatch=useDispatch()

  //console.log(selectCategory)
  const {postId}=useParams()
  console.log(postId)
  

  useEffect(() => {
    
    fetch(`/product/update-product/${postId}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.result);
        setProduct_name(result.result.product_name)
        setDescription(result.result.description)
        setQuantity(result.result.quantity)
        setPrice(result.result.price)
        
        //setCategory(result.result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("/category/get-category", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result.result);
        setCategory(result.result);
      })
      .catch((err) => console.log(err));
  }, [state]);


  let data = new FormData();
  data.append("quantity", quantity);
  data.append("description", description);
  data.append("price", price);
  data.append("product_name", product_name);
  data.append("product_category", selectCategory);
  data.append("product_img", product_img);

  //console.log(data);

  const add_product_handler = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.put(`/product/update-product/${postId}`, data, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((result) => {
        setLoading(false);
        console.log(result.data)
        if (result.data.error) {
          return setError(result.data.error);
        }
        dispatch({type: 'UPDATE_CATEGORY'})
        setSuccess("Product created success");
      })
      .catch((err) => console.log(err));
  };

    return (
        <div>
              <form onSubmit={add_product_handler}>
                  <div className="form-group">
                    <label for="exampleInputEmail1"></label>
                    <input
                    value={product_name}
                      onChange={(e) => {
                        setProduct_name(e.target.value);
                      }}
                      placeholder="Add your Product name"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                    value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      type="number"
                      min="0"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your product quantity"
                    />
                  </div>{" "}
                  <br />
                  <div className="form-group">
                    <input
                    value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      type="number"
                      min="0"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your product Price"
                    />
                  </div>{" "}
                  <br />
                  <div className="form-group">
                    <select
                      onChange={(e) => {
                        setSelectCategory(e.target.value);
                      }}
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option value="">Choose category</option>
                      {category &&
                        category.map((val) => {
                          return (
                            <option value={val._id} key={val._id}>
                              {val.category_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <br />
                  <div className="form-group">
                    <textarea
                    value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Enter your product description"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <br />
                  <div className="form-group">
                    <span>Product image: </span>
                    <input
                    //value={product_img}
                      enctype="multipart/form-data"
                      onChange={(e) => {
                        setProduct_img(e.target.files[0]);
                      }}
                      name="product_img"
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-primary">
                    Update Product
                  </button>
                </form>
        </div>
    );
};

export default UpdateProduct;