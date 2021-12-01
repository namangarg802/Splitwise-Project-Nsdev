import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { UserContext } from "./UserContext";
import { AllUserContext } from "./UserContext";
import AlertContext from "./AlertContext";
import Calendar from "react-calendar";
import "../index.css";
import PayModal from "./PayModal";
import { DateContext } from "./UserContext";
import SplitModal from "./SplitModal";
import { ListContext } from "./UserContext";
function Addexpense({ setModal, modal }) {
  const {
    user,
    setUser,
    userfriend,
    usrbalance,
    setBalance,
    expense,
    setExpense,
  } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  useEffect(() => {
    setCost(0);
    setpaymodal(false);
    setdtmodal(false);
    setsplitmodal(false);
    setEqual("equally");
    setPayer(user.name);
    setList([user.name]);
    setTag([]);
    setM(true);
    setlistobj({});
    const _list = {};
    _list[user.name] = 0;
    setlistobj(_list);
    setPart(`(₹0.00/person)`);
    console.log(listobj, "list", tags);
    // let _list = { ...listobj };
    // _list[user.name] = 0;
    // listobj[user.name] = 0;

    // console.log(listobj, "list");
    // console.log("chandiu ki chacha ne chandu ki chachi ko chandi raatme");
    // setlistobj(_list);
  }, [modal]);
  const [description, setDescription] = useState("");

  const [cost, setCost] = useState(0);
  const [paymodal, setpaymodal] = useState(false);
  const [dtmodal, setdtmodal] = useState(false);
  const [splitmodal, setsplitmodal] = useState(false);
  const [equal, setEqual] = useState("equally");
  // const { listobj, setlistobj } = useContext(ListContext);

  let b = usrbalance;
  const [payer, setPayer] = useState(user.name);
  const [value, onChange] = useState(new Date());
  const [a, setA] = useState("ji");
  console.log(a);
  var today = value;
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = today.toLocaleString("default", { month: "long" });
  var yyyy = today.getFullYear();
  today = mm + " " + dd + ", " + yyyy;
  const [tags, setTag] = useState([]);
  const [list, setList] = useState([user.name]);
  const [listobj, setlistobj] = useState({});
  const [part, setPart] = useState(`(₹0.00/person)`);
  // const [sum, setSum] = useState(0);
  const [m, setM] = useState(true);
  // console.log(listobj, " list of expensese hubc");
  // console.log(user);
  // console.log(list, user.name);
  // console.log(sum);
  useEffect(() => {
    setdtmodal(false);
  }, [value]);
  // useEffect(() => {
  //   let _list = { ...listobj };
  //   _list[user.name] = 0;

  //   console.log(listobj, "list", _list);
  //   console.log("chandiu ki chacha ne chandu ki chachi ko chandi raatme");
  //   setlistobj(_list);
  // }, []);
  // useEffect(() => {
  //   const _list = [...list];
  //   _list.push(user.name);
  //   setList(_list);
  // }, []);
  const addtag = (e) => {
    let filter;
    userfriend.map((f) => {
      if (f === e.target.value) {
        filter = f;
      }
    });
    console.log(filter, "check kar ra hu", listobj);
    let a = 0;
    Object.keys(listobj).map((f) => {
      if (f === filter) a++;
    });
    console.log(listobj, "add karna chau");
    if (filter && a === 0) {
      let _list = { ...listobj };

      _list[e.target.value] = 0;
      console.log(listobj, "list", _list);
      setlistobj(_list);
      setTag([...tags, e.target.value]);
      setList([...list, e.target.value]);
      setA(filter);
      e.target.value = "";
    }
  };
  const removetag = (i) => {
    let a;
    setTag(
      tags.filter((n, index) => {
        a = n;
        return index != i;
      })
    );
    setList(
      list.filter((_, index) => {
        return index != i + 1;
      })
    );
    const _list = { ...listobj };
    // Object.keys(_list).splice(_list[i + 1], 1);
    // console.log(_list);
    // setlistobj(_list);
    let b = list[i + 1];
    const c = delete _list[b];
    // console.log(c);
    setlistobj(_list);
    console.log(tags, list, "barbaad");
  };
  // const m = { color: "red" };
  console.log(tags);
  const getSum = () => {
    var t = 0;
    console.log(listobj);
    Object.keys(listobj).map((f) => {
      if (payer === f) {
        t = t + parseInt(cost) - parseInt(listobj[f]);
        console.log(t, "tp");
        // setSum(s + cost - listobj[f]);
        // console.log(sum);
      } else {
        const s = Math.abs(parseInt(listobj[f]));
        t = t + s;
        console.log(t, "t");
        // setSum(s + Math.abs(listobj[f]));
        // console.log(sum);
      }
    });
    // setSum(t);
    return t;
  };
  const saveexpense = async () => {
    const t = getSum();

    console.log(t);
    // console.log(sum);
    if (t > cost) {
      alert(
        `Please Check Your Amount distribution of Expenses. Your expenses total is greater than transaction cost`
      );
    } else if (t < cost)
      alert(
        `Please Check Your Amount distribution of Expenses. Your expenses total is less than transaction cost`
      );
    else {
      var exp = 0;
      var uowe = 0;
      var uowed = 0;
      if (user.name === payer) {
        exp = listobj[user.name];
        // uowed = Math.abs(listobj[user.name].toFixed(2));
      } else {
        exp = listobj[user.name];
        // uowe = Math.abs(listobj[user.name]).toFixed(2);
      }

      exp = user.balance ? parseInt(user.balance + exp).toFixed(2) : exp;
      console.log(exp, uowe, uowed, cost);
      console.log(user.owe, user.owed);
      // uowe = user.owe ? parseInt(user.owe) + uowe : uowe;
      // uowed = user.owed ? parseInt(user.owed) + uowed : uowed;
      console.log(typeof user.expenses);
      const useexp = { ...user.expenses };
      if (payer === user.name) {
        Object.keys(listobj).map((f) => {
          if (useexp[f]) useexp[f] = parseInt(useexp[f]) + parseInt(listobj[f]);
          else useexp[f] = 0 + parseInt(listobj[f]);
        });
      } else {
        Object.keys(listobj).map((f) => {
          if (f === payer) {
            if (useexp[f])
              useexp[f] =
                parseInt(useexp[f]) + parseInt(listobj[f] / tags.length);
            else useexp[f] = 0 + parseInt(listobj[f] / tags.length);
          } else if (f === user.name) {
            if (useexp[f])
              useexp[f] = parseInt(useexp[f]) + parseInt(listobj[f]);
            else useexp[f] = 0 + parseInt(listobj[f]);
          }
        });
      }
      console.log("useexp");
      Object.keys(useexp).map((f) => {
        if (f != user.name) {
          if (useexp[f] > 0) {
            uowe = uowe + parseInt(useexp[f]);
            console.log("owe", uowe);
          } else if (useexp[f] < 0) {
            uowed = uowed + Math.abs(parseInt(useexp[f]));
            console.log("owed", uowed);
          }
        }
      });

      console.log(useexp);
      const response = await fetch(
        "https://splitwise-backend-1.herokuapp.com/api/auth/addexpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            balance: exp,
            expenses: useexp,
            owe: uowe,
            owed: uowed,
          }),
        }
      );
      const json = await response.json();
      setBalance(json.user3.balance);
      console.log(json.user3);
      setUser(json.user3);
      setModal(false);
    }
  };
  useEffect(() => {
    if (m) setPart(`(₹${(cost / list.length).toFixed(2)}/person)`);
    else if (!m && payer === user.name)
      setPart(`(${list[1]} owes you ₹${cost})`);
    else setPart(`(You owe ${list[1]} ₹${cost})`);

    // {m?setPart(`(₹${(cost / list.length).toFixed(2)}/person)`):}

    if (equal === "equally" && cost) {
      const _list = { ...listobj };
      Object.keys(listobj).map((f) => {
        if (f === payer) {
          _list[f] = +(cost - cost / list.length).toFixed(2);
          console.log(f);
          setlistobj(_list);
        } else {
          _list[f] = -(cost / list.length).toFixed(2);
          console.log(f);
          setlistobj(_list);
        }
      });
      // setlistobj(_list);
      console.log(listobj);
    }
  }, [cost, tags, payer]);
  return (
    <div>
      <Modal isOpen={modal} className=" expmodalbox ">
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
          <h5 style={{ marginLeft: "150px" }}>Add an Expense</h5>
          <button
            style={{ position: "absolute", right: "10px" }}
            onClick={() => {
              setModal(false);
            }}
          >
            <i class="fas fa-times" />
          </button>
        </div>
        <div className="  exp-input p-2">
          <label style={{ width: "190px" }} htmlFor="">
            With You and:
          </label>
          <div style={{ position: "relative" }}>
            <ul className=" grid grid-cols-3  gap-2 ">
              {tags.map((t, i) => {
                console.log(t);
                return (
                  <li className="flex align-items-center" key={i}>
                    <img
                      src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                      alt=""
                    />
                    <span className="mx-1">{t}</span>
                    <button
                      style={{ color: "#c0c0c0" }}
                      onClick={() => {
                        removetag(i);
                      }}
                    >
                      <i class="fas fa-times" />
                    </button>
                  </li>
                );
              })}
              <input
                type="text"
                placeholder={tags.length ? null : "Enter name"}
                onKeyUp={(e) => {
                  {
                    return e.key === "Enter" ? addtag(e) : null;
                  }
                }}
                style={{ flex: "1" }}
              />
            </ul>
          </div>
        </div>
        {tags.length ? (
          <div>
            <div className="bg-white">
              <div className="px-5 pt-4 pb-2 flex exp-main-1">
                <img
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  alt=""
                />
                <div className="ml-3">
                  <div className="desc">
                    {" "}
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter a description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="cost mt-2">
                    {" "}
                    <span style={{ fontSize: "40px" }}>₹</span>
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="0.00"
                      onChange={(e) => {
                        setCost(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {m ? (
                <div className="exp-main-2 ml-28 mt-2 ">
                  <div>
                    {" "}
                    Paid by{" "}
                    <button
                      onClick={() => {
                        setpaymodal(true);
                        setsplitmodal(false);
                        setdtmodal(false);
                      }}
                    >
                      {payer === user.name ? "you" : payer}
                    </button>{" "}
                    and split{" "}
                    <button
                      onClick={() => {
                        setpaymodal(false);
                        setsplitmodal(true);
                        setdtmodal(false);
                      }}
                    >
                      {equal}
                    </button>
                    .
                  </div>

                  <span className="ml-20">
                    {/* {equal === "equally" ? {} : "jkj"} */}
                    {part}
                  </span>
                </div>
              ) : (
                <div className="exp-main-2 ml-40 mt-2 mr-40 ">
                  {" "}
                  <button
                    onClick={() => {
                      setsplitmodal(true);
                    }}
                  >
                    {part}
                  </button>{" "}
                </div>
              )}
              <div className="exp-main-3">
                <button
                  onClick={() => {
                    setdtmodal(true);
                    setpaymodal(false);
                    setsplitmodal(false);
                  }}
                >
                  {today}
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="exp-bottom ">
          <div className="exp-bottom-btn">
            {" "}
            <button
              className="cancel"
              onClick={() => {
                setModal(false);
              }}
            >
              {" "}
              Cancel
            </button>
            <button
              className="ml-3 save"
              onClick={() => {
                saveexpense();
              }}
            >
              Save{" "}
            </button>
          </div>
        </div>
        {paymodal ? (
          <PayModal setpaymodal={setpaymodal} setPayer={setPayer} list={list} />
        ) : null}
        {splitmodal ? (
          <SplitModal
            splitmodal={splitmodal}
            setsplitmodal={setsplitmodal}
            tags={tags}
            list={list}
            cost={cost}
            listobj={listobj}
            setlistobj={setlistobj}
            equal={equal}
            setEqual={setEqual}
            payer={payer}
            setPayer={setPayer}
            part={part}
            setPart={setPart}
            setM={setM}
          />
        ) : null}
        {dtmodal ? (
          <div className="dtmodal">
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
              <h5 style={{ marginLeft: "100px" }}>Choose Date</h5>
              <button
                style={{ position: "absolute", right: "10px" }}
                onClick={() => {
                  setdtmodal(false);
                  {
                    console.log("vh");
                  }
                }}
              >
                <i class="fas fa-times" />
              </button>
            </div>
            <div className="bg-white px-2 pt-2">
              <Calendar onChange={onChange} value={value} className="my" />
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default Addexpense;
