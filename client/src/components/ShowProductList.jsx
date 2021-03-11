import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

const ShowProductList = () => {
  const [productInfo, setProductInfo] = useState([]);

  //console.log(productInfo);
  const state = useSelector((state) => state.cat);
  //console.log(state)

  useEffect(() => {
    Axios.get("/product/get-product", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((res) => {
        //console.log(res.data.result);
        setProductInfo(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [state]);

  const delete_item_handler = (postId) => {
    fetch("/product/delete-product", {
      method: "delete",
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
      }),
    })
      .then((res) => {
        // console.log(postId);
        // console.log(res);
        let newData=productInfo.filter(val=>{
          return val._id!==postId
        })
        //console.log(newData)
        setProductInfo(newData);
      })
      .catch((err) => console.log(err));
  };

  const edit_your_product=(is)=>{
    console.log(is)
  }
  const postId=useParams()
  console.log(postId)
  return (
    <div>
      <h2 className="text-center py-3 border-bottom">All products List</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {productInfo.map((val) => {
            return (
              <tr>
                <th>{val._id}</th>
                <td>{val.product_name}</td>
                <td>{val.price}</td>
                <td>{val.quantity}</td>
                <td className="d-flex">
                  <Link to={`/product/${val._id}`} onClick={()=>edit_your_product(val._id)} className="btn btn-warning m-1">Edit</Link>
                  <button
                    onClick={() => {
                      delete_item_handler(val._id);
                    }}
                    className="btn btn-danger m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProductList;
