import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { UserContext } from "./UserContext";
import { AllUserContext } from "./UserContext";
import AlertContext from "./AlertContext";
import "../index.css";
function Addfriend({ setModal, modal }) {
  const { isalert, showAlert } = useContext(AlertContext);
  const [input, setInput] = useState("");
  const { user, setUser, setuserfriend, userfriend } = useContext(UserContext);
  const { allusers, setAll } = useContext(AllUserContext);
  console.log(user.friends);
  const [friends, setFriends] = useState(user.friends);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState([]);
  const [active, seActive] = useState(false);
  useEffect(() => {
    if (input == "") setShow(false);
  }, [input]);
  const change = (e) => {
    setInput(e.target.value);

    const filtered = allusers.filter((f) => {
      console.log(f.toLowerCase().includes(input.toLowerCase()));
      return f.toLowerCase().includes(input.toLowerCase());
    });
    if (filtered.length) {
      console.log(filtered);
      setFilter(filtered);
      setShow(true);
    } else {
      setShow(false);
    }
    if (filter[0] === input) {
      seActive(true);
    }
  };
  const Add = async (e) => {
    console.log(user.friends, userfriend);
    if (userfriend.indexOf(input) != -1) {
      console.log("jajaja");
      showAlert(`${input} already added as your friend`, "danger");
      setModal(false);
      setShow(false);
      setInput("");
      return;
    } else if (input === user.name) {
      showAlert(`You can't add yourself as a friend`, "danger");
      setModal(false);
      setShow(false);
      setInput("");
      return;
    }
    if (input) {
      console.log("hii");
      console.log(filter[0]);
      const response = await fetch(
        "https://splitwise-backend-1.herokuapp.com/api/auth/addfriend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            friend: input,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        setModal(false);
        let a = [...userfriend];
        a.push(input);
        setuserfriend(a);
        console.log(userfriend, "user ka friend");
        setInput("");
        setFriends(a);
        // getuser();

        showAlert(` ${json.friend} Added as your friend`, "success");

        // setInput();
        console.log(filter[0] + "added");
      } else {
        console.log(json.error);
        showAlert(json.error, "danger");
        setModal(false);
        setShow(false);
        setInput("");
      }
    }
  };
  console.log(filter);
  return (
    <div>
      <Modal isOpen={modal} className=" Modal ">
        <div
          style={{
            backgroundColor: "#1cc29f",
            border: "1px solid #eeeeee",
            padding: "5px",
            borderRadius: "10px 10px 0px 0px",
            color: "white",
          }}
        >
          <h5 style={{ marginLeft: "80px" }}>Add a Friend</h5>
        </div>

        <div className="flex flex-col">
          {" "}
          <input
            onChange={(e) => {
              change(e);
            }}
            value={input}
            type="text"
            className="mx-3 mt-3 mb-0"
            placeholder="Enter a Username"
          />
          {show ? (
            <div
              style={{
                marginLeft: "16px",
                marginRight: "16px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <ul className="relative left-20">
                {filter.map((f) => {
                  {
                    console.log(f);
                  }
                  return (
                    <li>
                      <button
                        onClick={() => {
                          setInput(f);
                          setShow(false);
                        }}
                      >
                        {f}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex justify-around mb-3 mt-3">
          {" "}
          <button
            type="button"
            disabled={active ? "true" : ""}
            onClick={(e) => {
              Add(e);
            }}
            className="px-6 py-2  shadow rounded-full text-white font-bold  
            "
            style={{ backgroundColor: "#FF652F", color: "white" }}
          >
            Add Friend
          </button>
          <button
            onClick={() => {
              setModal(false);
              setShow(false);
              setInput("");
            }}
            className="px-6 py-2  shadow rounded-full text-white font-bold  
            "
            style={{ backgroundColor: "#1cc29f", color: "white" }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Addfriend;
