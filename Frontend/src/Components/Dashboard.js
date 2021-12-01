import React, { useContext, useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { UserContext } from "./UserContext";
import Addfriend from "./Addfriend";
import AlertContext from "./AlertContext";
import Alert from "./Alert";
import Addexpense from "./Addexpense";
import Payment from "./Payment";
import Settle from "./Settle";
import "../index.css";
function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const { user, setUser, setuserfriend, userfriend } = useContext(UserContext);
  const [paymodal, setPaymodal] = useState(false);
  const [modal, setModal] = useState(false);
  const [expmodal, setexpModal] = useState(false);
  const [owelist, setowelist] = useState({});
  const [owedlist, setowedlist] = useState([]);
  const [order, setOrder] = useState(false);

  // const [friend, setfriend] = useState(userfriend);
  const friend = userfriend;
  console.log(friend, user.friends, "jiji");
  const act = (e) => {
    if (e.target.id === "friends") setModal(true);
    else if (e.target.id === "expense") setexpModal(true);
    console.log(e.target.id);
    setActive(e.target.id);
  };
  let list;
  if (friend) {
    list = friend.map((f) => {
      {
        console.log(f);
      }
      return <li className="innerli">{f}</li>;
    });
  }

  console.log(list);
  return (
    <div>
      <div className="sidenav">
        <h1>Splitwise</h1>
        <ul className="outerul">
          <li className="outerli">
            <button
              type="button"
              data-toggle="modal"
              data-target="#myModal"
              id="friends"
              className={active === "friends" ? "active" : "noactive"}
              onClick={(e) => {
                act(e);
              }}
            >
              Friends +
            </button>

            <ol className="innerol">
              {friend.map((f) => {
                {
                  console.log(f);
                }
                return <li className="innerli">{f}</li>;
              })}
            </ol>
          </li>
          <li className="outerli">
            {" "}
            <button
              id="dashboard"
              onClick={(e) => {
                act(e);
              }}
              className={active === "dashboard" ? "active" : "noactive"}
            >
              {" "}
              User Dashboard <span className="fas fa-caret-down"></span>{" "}
            </button>
            <ol className="innerol">
              <li className="innerli">
                Total Balance:{" "}
                {user.balance
                  ? user.balance >= 0
                    ? `₹${user.balance}`
                    : `-₹${Math.abs(user.balance)}`
                  : `₹0`}
              </li>
              <li className="innerli">You Owe: ₹{user.owe ? user.owe : 0}</li>
              <li className="innerli">
                You Are Owed: ₹{user.owed ? user.owed : 0}
              </li>
            </ol>
          </li>
          <li className="outerli">
            {/* <button onClick={() => setEdit(!edit)}>
                {" "}
                Appointment Details <span className="fas fa-caret-down"></span>{" "}
              </button>
              <ol className="innerol" className={edit ? "show" : "notshow"}>
                <li className="innerli">Date:{date ? date : "Not Selected"}</li>
                <li className="innerli">Time:{time ? time : "Not Selected"}</li>
              </ol> */}
          </li>
          {/* <li className="outerli">
              {" "}
              <button
                id="details"
                onClick={(e) => {
                  act(e);
                }}
                className={active === "details" ? "active" : "noactive"}
              >
                {" "}
                User Details <span className="fas fa-caret-down"></span>{" "}
              </button>
              <ol className="innerol">
                <li className="innerli">{user.name}</li>
                <li className="innerli">{user.email}</li>
                <li className="innerli">{user.mobileno}</li>
              </ol>
            </li> */}
          <li className="outerli">
            {/* <button onClick={() => setEdit(!edit)}>
                {" "}
                Appointment Details <span className="fas fa-caret-down"></span>{" "}
              </button>
              <ol className="innerol" className={edit ? "show" : "notshow"}>
                <li className="innerli">Date:{date ? date : "Not Selected"}</li>
                <li className="innerli">Time:{time ? time : "Not Selected"}</li>
              </ol> */}
          </li>
        </ul>
      </div>

      <div className=" dashmodalbox">
        <div
          className="dashboard mt-5   "
          style={{
            backgroundColor: "#EEEEEE",
            //
            borderRadius: "16px 16px 0px 0px",
          }}
        >
          <Alert />
          <div className="   flex ">
            <h2 className="mx-auto">Dashboard</h2>
          </div>
          <div className="flex  justify-around">
            <button
              className="px-3 py-1 shadow rounded-full text-white font-bold  
            "
              style={{ backgroundColor: "#FF652F", color: "white" }}
              id="expense"
              onClick={(e) => {
                act(e);
              }}
            >
              Add an expense
            </button>
            <button
              className="px-3 py-1  shadow rounded-full text-white font-bold  
            "
              style={{ backgroundColor: "#1cc29f", color: "white" }}
              onClick={() => {
                setPaymodal(!paymodal);
              }}
            >
              Settle Up
            </button>
          </div>
          {/* <hr /> */}
          <div
            style={{
              borderTop: "1px solid #ccc",
              marginTop: "10px",
            }}
            className="flex "
          >
            <div
              style={{
                borderRight: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                width: "166px",
                alignItems: "center",
              }}
            >
              <span> Total Balance </span>
              <span
                style={{ color: "#999999" }}
                style={
                  user.balance >= 0
                    ? user.balance > 0
                      ? { color: "#1CC29F" }
                      : { color: "#999999" }
                    : { color: "#FF652F" }
                }
              >
                {user.balance
                  ? user.balance >= 0
                    ? `₹${user.balance}`
                    : `-₹${Math.abs(user.balance)}`
                  : `₹0`}
                {/* {user.balance? (user.balance >= 0)
                 ? `₹${user.balance}`
                  : `-₹${Math.abs(user.balance)}`:₹0} */}
              </span>
            </div>
            <div
              style={{
                borderRight: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                width: "166px",
                alignItems: "center",
              }}
            >
              <span> You owe </span>
              <span
                style={user.owe ? { color: "#FF652F" } : { color: "#999999" }}
              >
                ₹{user.owe ? user.owe : 0}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "166px",
                alignItems: "center",
              }}
            >
              <span> You are owed </span>
              <span
                style={user.owed ? { color: "#1CC29F" } : { color: "#999999" }}
              >
                ₹{user.owed ? user.owed : 0}
              </span>
            </div>
          </div>
          <hr />
        </div>
        <div className="flex justify-between" style={{ color: "#999999" }}>
          <div className="right ml-3">
            {" "}
            <h5>YOU OWE</h5>
            {user.expenses ? (
              <ul>
                {Object.keys(user.expenses).map((f, i) => {
                  if (f != user.name && user.expenses[f] > 0) {
                    return (
                      <li key={i} className=" flex align-items-center">
                        <img
                          className="dashimg"
                          src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                          alt=""
                        />
                        <div className=" flex flex-col">
                          <span className="mx-1 text-black ">{f}</span>
                          <span className="mx-1" style={{ color: "#FF652F" }}>
                            {" "}
                            you owe{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {`₹${user.expenses[f]}`}
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            ) : null}
            {user.owe ? null : <p>You do not owe anything</p>}
          </div>
          <div className="" style={{ border: "2px solid #EEEEEE" }}></div>
          <div className="left mr-3">
            <h5>YOU ARE OWED</h5>
            {user.expenses
              ? Object.keys(user.expenses).map((f, i) => {
                  if (f != user.name && user.expenses[f] < 0) {
                    return (
                      <li key={i} className=" flex align-items-center">
                        <img
                          className="dashimg"
                          src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                          alt=""
                        />
                        <div className=" flex flex-col">
                          <span className="mx-1 text-black ">{f}</span>
                          <span className="mx-1" style={{ color: "#1CC29F" }}>
                            {" "}
                            owes you{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {`₹${Math.abs(user.expenses[f])}`}
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  }
                })
              : null}
            {/* {user.expenses ? <ul></ul> : null} */}
            {user.owed ? null : <p>You are not owed anything</p>}
          </div>
        </div>
      </div>
      <Settle setModal={setPaymodal} modal={paymodal} />
      <Addfriend setModal={setModal} modal={modal} />
      <Addexpense setModal={setexpModal} modal={expmodal} />
      {order ? <Payment /> : null}
    </div>
  );
}

export default Dashboard;
