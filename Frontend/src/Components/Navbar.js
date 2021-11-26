import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import AlertContext from "./AlertContext";
import Modal from "react-modal";
import Alert from "./Alert";
import "../index.css";
// import '../../public/logos/logo2.png'
function Navbar() {
  const history = useHistory();
  const { isalert, showAlert } = useContext(AlertContext);
  const { user, setUser } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const act = (e) => {
    setModal(!modal);
    console.log("hii");
    console.log(modal);
    // console.log(e.target.id);
    // setActive(e.target.id);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
      // console.log("auth is true");
    } else {
      // console.log("Auth is false");
    }
  });
  return (
    <nav className=" mx-auto pt-4  h-10 d-flex align-items-center justify-content-between  ">
      <img
        src="/logos/logo2.png"
        className="ml-4"
        style={{ height: "50px" }}
        alt=""
      />
      {/* <img
        src="https://assets.splitwise.com/assets/fat_rabbit/dashboard2@2x.png"
        alt=""
      /> */}
      {!auth ? (
        <div className="d-flex mr-20  align-items-center">
          <button
            className="mr-5 font-bold navbtn1   "
            onClick={() => {
              history.push("/Login");
            }}
          >
            Log in
          </button>
          <button
            className="px-6 py-2  shadow rounded-full text-white font-bold  clk navbtn2
                  "
            onClick={() => {
              history.push("/Signup");
            }}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="d-flex mr-20    align-items-center">
          {" "}
          <button
            className="px-6 py-2  shadow rounded-full text-white font-bold   navbtn2
            "
            onClick={() => {
              localStorage.removeItem("token");
              setAuth(false);

              showAlert("Logged Out Susscessfuly", "success");
              history.push("/");
            }}
          >
            Logout
          </button>
          <button
            onClick={(e) => {
              act(e);
            }}
            className="flex align-items-center ml-5 p-2  font-bold  shadow rounded-full text-white"
            style={{ backgroundColor: "#FF652F" }}
          >
            <div className="m-1">
              {/* <img className="h-6 w-6 m-2" src="/logos/user.png" alt="" /> */}
              <i class="far fa-user "></i>
            </div>
            {user.name}
            <button className="m-1 ">
              {" "}
              <span className="fas fa-caret-down"></span>{" "}
            </button>
          </button>
        </div>
      )}
      {modal ? (
        <div isOpen={modal} className=" UserModal pull-right ">
          <ul className="px-2">
            <li className="py-2 d-flex">
              <div className="mr-2">
                <i class="far fa-user "></i>
              </div>
              {user.name}
            </li>
            <li className="py-2  d-flex">
              <div className="mr-2">
                <i class="far fa-envelope"></i>
              </div>
              {user.email}
            </li>
            <li className="py-2  d-flex">
              <div className="mr-2">
                <i class="fas fa-phone-square-alt"></i>
              </div>
              {user.mobileno}
            </li>
          </ul>
        </div>
      ) : (
        <div className="usermodal d-none"></div>
      )}
    </nav>
  );
}

export default Navbar;
