import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import AlertContext from "./AlertContext";
import { AuthContext } from "./AuthContext";
import emailjs from "emailjs-com";
import Alert from "./Alert";
import "../index.css";
function Login() {
  const history = useHistory();
  const { isalert, showAlert } = useContext(AlertContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [details, setDetais] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetais({ ...details, [e.target.name]: e.target.value });
    // console.log(details);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://splitwise-backend-1.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: details.email,
          password: details.password,
        }),
      }
    );
    const json = await response.json();
    if (json.success) {
      // save auth token in local storage and redirect
      // showAlert("Logged in successfully", "success");
      window.scrollTo(0, 0);
      localStorage.setItem("token", json.jwttoken);
      // console.log(json);
      emailjs
        .sendForm(
          "service_5onvfzo",
          "template_yhhw4z3",
          e.target,
          "user_ZfBOvC56t2eosRA3uUc67"
        )
        .then(
          (result) => {
            // console.log(result.text);
          },
          (error) => {
            // console.log(error.text);
          }
        );
      showAlert("Logged In successfully", "success");
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } else {
      window.scrollTo(0, 0);
      showAlert(json.error, "danger");
      // console.log("error", json.error);
    }
  };
  return (
    <section className="flex   Login bg-down1   ">
      <Alert />
      {/* <img src="/images/logo.png" alt="Pizza House" /> */}
      {/* <img src="/logos/logo2.png" className="ml-8"style= alt="" /> */}
      <div className="loginmodalbox mt-10 bg-down2 flex flex-col  ">
        <h3>Enter Your Login Credentials</h3>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" style={{ fontSize: "24px" }}>
              Enter your email address:
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              required
              className="shadow"
            />
            <br />
            <label htmlFor="" style={{ fontSize: "24px" }}>
              Enter Your Password:
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              required
              className="shadow"
            />

            <br />
            <br />

            <button className="rounded-full    font-bold px-4 py-3 ml-40 ">
              Log In
            </button>
          </form>
          <p className="ml-40 ">
            Don't have an account? <Link to="Signup">Signup</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
