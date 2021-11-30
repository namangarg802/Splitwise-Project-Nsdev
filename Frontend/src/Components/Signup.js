import React, { useState, useContext } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import AlertContext from "./AlertContext";
import emailjs from "emailjs-com";
import Alert from "./Alert";
import { isDOMComponent } from "react-dom/test-utils";
function Signup() {
  const history = useHistory();
  const { isalert, showAlert } = useContext(AlertContext);
  const [details, setDetais] = useState({
    name: "",
    email: "",
    password: "",
    mobileno: "",
  });

  const handleChange = (e) => {
    setDetais({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://splitwise-backend-1.herokuapp.com/api/auth/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: details.name,
          email: details.email,
          password: details.password,
          mobileno: details.mobileno,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    let err;
    if (json.error) err = json.error;
    else if (json.errors) err = json.errors[0].msg;
    if (json.success) {
      // save auth token in local storage and redirect
      localStorage.setItem("token", json.jwttoken);
      emailjs
        .sendForm(
          "service_5onvfzo",
          "template_7mdfv33",
          e.target,
          "user_ZfBOvC56t2eosRA3uUc67"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      window.scrollTo(0, 0);
      showAlert("Sign up successfully", "success");
      setTimeout(() => {
        history.push("/");
      }, 1500);
      console.log("success");
    } else {
      window.scrollTo(0, 0);
      showAlert(err, "danger");
      console.log("invalid");
    }
  };
  return (
    <section className="flex Signup bg-down1">
      <Alert />
      {/* <img src="/images/logo.png" alt="Pizza House" /> */}

      <div className="modalbox mt-8 bg-down2 flex flex-col justify-center ">
        <h3>INTRODUCE YOURSELF</h3>
        <div className="Signupform">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" style={{ fontSize: "24px" }}>
              Hi there! My name is
            </label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={details.name}
              onChange={handleChange}
              required
              className="shadow"
            />
            <br />
            <label htmlFor="" style={{ fontSize: "24px" }}>
              Here’s my email address:
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
              And here’s my password:
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
            <label htmlFor="" style={{ fontSize: "24px" }}>
              And here’s my Mobile No:
            </label>
            <br />
            <input
              type="number"
              id="mobileno"
              name="mobileno"
              value={details.mobileno}
              onChange={handleChange}
              required
              className="shadow"
            />

            <br />
            <div className="mt-3 ml-40">
              <button className="rounded-full   font-bold px-4 py-3 ">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <p className="ml-40 mb-20">
          Already have an account? <Link to="Login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
