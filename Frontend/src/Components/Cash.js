import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

function Cash({ name, amount, setAmount, modal, bal, setModal }) {
  const {
    user,
    setUser,
    userfriend,
    usrbalance,
    setBalance,
    expense,
    setExpense,
  } = useContext(UserContext);
  console.log(amount, bal, user);
  const save = async () => {
    console.log(amount);
    let _list = { ...user.expenses };
    let balance;
    let owe;
    let owed;
    if (bal === "pay") {
      _list[user.name] = _list[user.name] + Math.abs(amount);
      _list[name] = _list[name] - Math.abs(amount);
      balance = user.balance;
      balance = balance + Math.abs(amount);
      owe = user.owe;
      owe = owe - Math.abs(amount);
    } else {
      _list[user.name] = _list[user.name] - Math.abs(amount);
      _list[name] = _list[name] + Math.abs(amount);
      balance = user.balance;
      balance = balance - Math.abs(amount);
      owed = user.owed;
      owed = owed - Math.abs(amount);
    }
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
    setBalance(json.user3.balance);
    console.log(json.user3);
    setUser(json.user3);
    setModal(false);
  };
  return (
    <div className="bg-white payimg flex align-items-center flex-col cash">
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

      {bal === "pay" ? <div>You paid {name}</div> : <div>{name} Paid you</div>}

      <div className=" mt-2">
        {" "}
        <span style={{ fontSize: "30px" }}>₹</span>
        <input
          type="number"
          name=""
          id=""
          placeholder="0.00"
          value={Math.abs(amount)}
          onChange={(e) => {
            setAmount(e.target.value);
            console.log(amount, e.target.value);
          }}
        />
      </div>

      <div className="flex">
        {" "}
        <button
          className="save"
          onClick={() => {
            save();
          }}
        >
          Save
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

export default Cash;
