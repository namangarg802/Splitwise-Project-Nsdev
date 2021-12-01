import React, { useContext, useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { UserContext } from "./UserContext";
// import logo from "/logos/logo.svg";
// import "./App.css";
import axios from "axios";

function Payment({ name, amount, setAmount, modal, setModal }) {
  useEffect(() => {
    setCost(amount);
    setMsg("");
  }, modal);
  const { user, setUser, setuserfriend, userfriend } = useContext(UserContext);
  const [msg, setMsg] = useState("");
  const [cost, setCost] = useState(amount);
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
    const send = { amount: cost };
    const result = await axios.post(
      "http://localhost:5000/api/auth/payment",
      send
    );
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
      name: name,
      description: "Settling account transaction",
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
        change(result.data.msg);
        alert(result.data.msg);
        setMsg(result.data.msg);
      },

      prefill: {
        name: user.name,
        email: user.email,
        contact: user.monileno,
      },
      notes: {
        address: "#1CC29F",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const change = async (m) => {
    if (m === "success") {
      console.log(m);
      console.log(amount);
      let _list = { ...user.expenses };
      let balance;
      let owe;
      let owed;

      _list[user.name] = _list[user.name] + Math.abs(amount);
      _list[name] = _list[name] - Math.abs(amount);
      balance = user.balance;
      balance = balance + Math.abs(amount);
      owe = user.owe;
      owe = owe - Math.abs(amount);

      console.log(_list, balance, owed, owe);

      const response = await fetch(
        "https://splitwise-backend-1.herokuapp.com/api/auth/addexpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            balance: balance,
            expenses: _list,
            owe: owe,
            owed: owed,
          }),
        }
      );
      const json = await response.json();
      // setBalance(json.user3.balance);
      console.log(json.user3);
      setUser(json.user3);
      setModal(false);
    } else {
      console.log(m);
    }
  };
  return (
    <div className="bg-white payimg flex align-items-center flex-col">
      <div className="flex align-items-center justify-content-center  pt-4">
        <img
          src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
          alt=""
        />
        <i class="fas fa-arrow-right fa-2x mx-2"></i>
        <img
          src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
          alt=""
        />
      </div>
      <div>You are sending {name}</div>
      <div className=" mt-2">
        {" "}
        <span style={{ fontSize: "30px" }}>₹</span>
        <input
          type="number"
          name=""
          id=""
          placeholder="0.00"
          value={cost}
          onChange={(e) => {
            setCost(e.target.value);
          }}
        />
      </div>

      <div className="razor flex align-items-center">
        {" "}
        <button className="App-link save" onClick={displayRazorpay}>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/logos/logo.svg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            {`Pay ${name} ${cost} `}
          </div>
        </button>
        <button
          className="cancel"
          onClick={() => {
            setModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Payment;
