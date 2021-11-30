import React, { useContext, useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { UserContext } from "./UserContext";
// import logo from "/logos/logo2.png";
// import "./App.css";
import axios from "axios";

function Payment() {
  const { user, setUser, setuserfriend, userfriend } = useContext(UserContext);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log(res);
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/api/auth/payment");
    console.log(result);
    if (!result) {
      console.log("no result");
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_BE6FHf4PSPlmir", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: user.name,
      description: "Test Transaction",
      //   image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        console.log(data);
        const result = await axios.post(
          "http://localhost:5000/api/auth/success",
          data
        );
        console.log(result);
        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logos/logo2.png" className="App-logo" alt="logo" />
        <p>Buy React now!</p>
        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header>
    </div>
  );
}

export default Payment;
