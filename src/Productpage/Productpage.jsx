import axios from "axios";
import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Productpage() {
  const navigate = useNavigate();
  const [productdata, setProductdata] = useState([]);

  const token = localStorage.getItem("saveToken_ECommerce");

  if (!token) {
    alert("session expiry");
    navigate("/login");
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://mern-backend-khb2.onrender.com",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setProductdata(res.data);
      })
      .catch((err) => {
        console.log("error be:->", err);

        if (err.response && err.response.status == 403) {
          alert("session expired! login please");
          localStorage.removeItem("saveToken_ECommerce");
          navigate("/login");
        } else {
          alert("⚠️ Unable to fetch bookings.");
        }
      });
  }, []);

  function addToCart_and_getFromCart(products_add) {
    const existingIteminCart = JSON.parse(localStorage.getItem("myCart")) || [];
    const updatadCart = [...existingIteminCart, products_add];
    localStorage.setItem("myCart", JSON.stringify(updatadCart));
    alert("Item added to cart successfully ✅");
  }

  return (
    <>
      <Header />
      <div>
        <div className="product-container">
          {productdata.map((productdata_comming, index) => {
            return (
              <div className="product-card" key={index}>
                <img
                  className="product-image"
                  src={productdata_comming.image}
                  alt="Error"
                />
                <p className="product-para">{productdata_comming.name}</p>
                <p className="product-para">
                  {productdata_comming.description}
                </p>
                <p className="product-para">₹ {productdata_comming.price}</p>

                <button
                  className="cart-button"
                  onClick={() => {
                    addToCart_and_getFromCart(productdata_comming);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Productpage;