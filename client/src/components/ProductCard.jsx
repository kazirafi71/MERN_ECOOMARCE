import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

const ProductCard = ({ productInfo }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          {productInfo.map((val) => {
            console.log(val);
            return (
              <div className="col-md-4 g-5">
                <div class="card text-center">
                  <img
                    src={`/uploads/${val.product_img}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{val.product_name} </h5>
                    <p className="card-text">
                      price: {val.price} taka
                    </p>
                    <a href="#" className="btn btn-primary">
                      Add to cart 
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
