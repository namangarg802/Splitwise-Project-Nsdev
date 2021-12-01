import React, { useContext, useState, useEffect } from "react";
import "../index.css";
import { UserContext } from "./UserContext";
import Modal from "react-modal";
import Payment from "./Payment";
import Cash from "./Cash";
// import logo from "/logos/logo.svg";
function Settle({ setModal, modal }) {
  useEffect(() => {
    setName("");
    setAmount(0);
    setMode(" ");
    setbal("");
  }, [modal]);
  const [order, setOrder] = useState(false);
  const [bal, setbal] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [mode, setMode] = useState(" ");
  const { user } = useContext(UserContext);
  return (
    <div>
      <Modal isOpen={modal} className="settleModal  ">
        <div
          style={{
            backgroundColor: "#1cc29f",
            border: "1px solid #eeeeee",
            padding: "5px",
            display: "flex",
            borderRadius: "10px 10px 0px 0px",
            color: "white",
            justifyContent: "center",
          }}
        >
          <h5 style={{ marginRight: "40px" }}>Settle Up</h5>
          <button
            style={{ position: "absolute", right: "10px" }}
            onClick={() => {
              setModal(false);
              {
                console.log("vh");
              }
            }}
          >
            <i class="fas fa-times" />
          </button>
        </div>
        {!name ? (
          <div className="bg-white">
            <span className="mx-28 my-10">Settle Up with</span>
            <div>
              <ul className="">
                {user.expenses
                  ? Object.keys(user.expenses).map((f, i) => {
                      if (f != user.name && user.expenses[f] > 0) {
                        return (
                          <li
                            key={i}
                            style={{
                              padding: "2px",
                              margin: "10px",
                            }}
                          >
                            <button
                              className=" flex align-items-center width-full"
                              onClick={() => {
                                setName(f);
                                setAmount(user.expenses[f]);
                                setbal("pay");
                              }}
                            >
                              <img
                                className="dashimg"
                                src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                                alt=""
                              />

                              <span className="mx-1 text-black ">{f}</span>
                              <span
                                className="absolute right-5"
                                style={{ color: "#FF652F" }}
                              >
                                {" "}
                                you owe them{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {`₹${user.expenses[f]}`}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      }
                      if (f != user.name && user.expenses[f] < 0) {
                        return (
                          <li
                            key={i}
                            style={{
                              padding: "2px",
                              margin: "10px",
                            }}
                          >
                            <button
                              className=" flex align-items-center width-full"
                              onClick={() => {
                                setName(f);
                                setAmount(user.expenses[f]);
                                setbal("recive");
                              }}
                            >
                              <img
                                className="dashimg"
                                src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                                alt=""
                              />

                              <span className="mx-1 text-black ">{f}</span>
                              <span
                                className="absolute right-5"
                                style={{ color: "#1CC29F" }}
                              >
                                {" "}
                                owes you{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {`₹${Math.abs(user.expenses[f])}`}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      }
                    })
                  : null}
              </ul>
            </div>
            <div></div>
          </div>
        ) : mode === " " ? (
          <div className="bg-white">
            <span className="ml-24" style={{ color: "#666666" }}>
              Choose Payment Method
            </span>
            <div className="flex justify-content-center flex-col">
              <button
                style={{
                  backgroundColor: "#5CC5A7",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px",
                }}
                onClick={() => {
                  setMode("cash");
                }}
              >
                Record a Cash Payment
              </button>
              {bal === "pay" ? (
                <button
                  style={{
                    backgroundColor: "#5CC5A7",
                    color: "white",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                  onClick={() => {
                    setOrder(true);
                    setMode("Online");
                  }}
                >
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
                      style={{ width: "50px", height: "50px" }}
                    />{" "}
                    <span> Pay using Razorpay</span>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        ) : mode === "cash" ? (
          <Cash
            bal={bal}
            name={name}
            amount={amount}
            setAmount={setAmount}
            modal={modal}
            setModal={setModal}
          />
        ) : (
          <div className="bg-white">
            {" "}
            <Payment
              name={name}
              amount={amount}
              setAmount={setAmount}
              modal={modal}
              setModal={setModal}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Settle;
