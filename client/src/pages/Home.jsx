import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";



const Home = () => {
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    Axios.get("/product/get-product", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((res) => {
        console.log(res.data.result);
        setProductInfo(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      
      <div className="container">
        <div className="row ">
        <ProductCard productInfo={productInfo} />
        </div>
        
        
      </div>
    </div>
  );
};

export default Home;
