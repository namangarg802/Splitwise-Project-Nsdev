import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { UserContext } from "./UserContext";
import "../index.css";
function PayModal({ setpaymodal, setPayer, list }) {
  const [value, onChange] = useState(new Date());

  const { user, userfriend } = useContext(UserContext);
  const friend = userfriend;
  console.log(userfriend);
  return (
    <div>
      <div className="paymodal">
        <div
          style={{
            backgroundColor: "#1cc29f",
            border: "1px solid #eeeeee",
            padding: "5px",
            display: "flex",
            borderRadius: "10px 10px 0px 0px",
            color: "white",
          }}
        >
          <h5 style={{ marginLeft: "100px" }}>Choose Payer</h5>
          <button
            style={{ position: "absolute", right: "10px" }}
            onClick={() => {
              setpaymodal(false);
              {
                console.log("vh");
              }
            }}
          >
            <i class="fas fa-times" />
          </button>
        </div>
        <div className="bg-white">
          <ul>
            {list.map((f) => {
              return (
                <li>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px",
                      width: "100%",
                    }}
                    onClick={() => {
                      console.log(f);
                      setPayer(f);
                      setpaymodal(false);
                    }}
                  >
                    {" "}
                    <img
                      src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                      alt=""
                    />
                    <span className="ml-2">{f}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PayModal;
