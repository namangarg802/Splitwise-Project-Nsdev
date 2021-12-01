import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
function SplitModal({
  splitmodal,
  setsplitmodal,
  cost,
  list,
  listobj,
  setlistobj,
  equal,
  setEqual,
  payer,
  setPayer,
  part,
  setPart,
  setM,
}) {
  useEffect(() => {
    setsplitmodal(true);
    setowe(true);
    setowes(true);
    setClick(false);
    setAmount();
  }, [splitmodal]);
  const [method, setMethod] = useState(true);
  const [split, setsplit] = useState(true);
  const [owe, setowe] = useState(true);
  const [owes, setowes] = useState(true);
  const [click, setClick] = useState(false);
  const [amount, setAmount] = useState();

  const [total, setTotal] = useState(0);
  const { user, userfriend } = useContext(UserContext);
  console.log(user, "user hu darta koni", user.name);
  console.log(listobj);
  useEffect(() => {
    if (equal === "unequally") {
      const _listobj = { ...listobj };
      Object.keys(listobj).map((f) => {
        _listobj[f] = 0;
      });
      setlistobj(_listobj);
      document.getElementById("InputId").value = "";
      console.log(_listobj, "listobjsehu");
    }
  }, [list, cost]);

  const func1 = () => {
    setM(false);
    setEqual("unequally");
    setMethod(false);
    const _list = { ...listobj };
    _list[list[0]] = -cost;
    _list[list[1]] = cost;
    setlistobj(_list);
    setowe(false);
    setowes(true);
    setPayer(list[1]);
    setPart(`(You owe ${list[1]} ₹${cost})`);
  };
  const func2 = () => {
    setM(false);
    setEqual("unequally");
    setMethod(false);
    const _list = { ...listobj };
    const b = _list[list[0]];
    _list[list[0]] = +cost;
    _list[list[1]] = -cost;
    setlistobj(_list);
    setPayer(list[0]);
    setowe(true);
    setowes(false);
    setPart(`(${list[1]} owes you ₹${cost})`);
    // console.log(owe, owes, click);
  };
  const distriequal = () => {
    setM(true);
    // setowe(true);
    // setowes(true);

    setPart(`(₹${(cost / list.length).toFixed(2)}/person)`);
    setMethod(true);
    setEqual("equally");
    setTotal(0);
    const _list = { ...listobj };
    list.map((f) => {
      if (f === payer) {
        _list[f] = (cost - cost / list.length).toFixed(2);
      } else {
        _list[f] = -(cost / list.length).toFixed(2);
      }
      setlistobj(_list);
    });
  };
  // console.log(listobj.exp[list[1]], listobj);
  const distriamount = (e, i) => {
    if (e.key === "Backspace") setM(true);
    if (parseInt(e.target.value) > cost) setAmount("err");
    else setAmount("");
    //  console.log( a.replace(a,e.targetvalue));

    const _list = { ...listobj };

    if (list[i] === payer) {
      // _list[list[i]] = e.target.value;
      // setOwner(e.target.value);

      _list[payer] = parseInt(cost - e.target.value);
    } else {
      _list[list[i]] = -e.target.value;
    }
    setlistobj(_list);
    if (listobj[user.name] > 0)
      setPart(`You get back ₹${Math.abs(_list[user.name])}`);
    else if (listobj[user.name] < 0)
      setPart(`You owe ₹${Math.abs(_list[user.name])}`);
    else setPart(`You owe nothing`);
  };
  // useEffect(() => {
  //   Object.keys(listobj).map((f) => {
  //     if (f === user.name) {
  //       console.log("nmnm");
  //       setTotal(total + owner);
  //     } else setTotal(total + Math.abs(listobj[f]));
  //   });
  // }, [listobj]);

  console.log(listobj, list);

  return (
    <div>
      <div className="splitmodal">
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
              setsplitmodal(false);
            }}
          >
            <i class="fas fa-times" />
          </button>
        </div>
        {list.length === 2 ? (
          <div className="bg-white splitmodal-main1">
            <button
              onClick={() => {
                setMethod(true);
                setM(true);
                setClick();
                setowe(true);
                setowes(true);
              }}
            >
              Split the expense
            </button>
            <button
              onClick={() => {
                {
                  setClick("owe");
                  // setsplitmodal(false);
                  return owe ? func1() : null;
                }
              }}
              className={click === "owe" ? "click" : null}
            >
              You owe {list[1]} ₹{cost}
            </button>
            <button
              className="mb-2"
              onClick={() => {
                {
                  setClick("owes");
                  return owes ? func2() : null;
                }
              }}
              className={click === "owes" ? "click" : null}
            >
              {list[1]} owes you ₹{cost}
            </button>
          </div>
        ) : null}
        {method ? (
          <div className="splitmodal-main2 bg-white">
            <hr style={{ margin: "10px" }} />
            <div className="flex  justify-content-center">
              <button
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px 0px 0px 5px",
                }}
                className={equal === "equally" ? "select" : "deselect"}
                onClick={() => {
                  distriequal();
                }}
              >
                Split equally
              </button>
              <button
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "0px 5px 5px 0px",
                }}
                className={equal === "unequally" ? "select" : "deselect"}
                onClick={() => {
                  setEqual("unequally");
                }}
              >
                Split by amounts
              </button>
            </div>
            {equal === "equally" ? (
              <div>
                <div className="splitmodal-main3">
                  <h5 className="mt-2 ml-3">Split equally</h5>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    {list.map((f) => {
                      return (
                        <li className="flex align-items-center m-2">
                          <img
                            src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                            alt=""
                          />
                          <span className="ml-2 font-bold">{f}</span>
                          <span className="absolute right-10 ">
                            ₹{cost ? (cost / list.length).toFixed(2) : 0.0}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <div className="splitmodal-main3">
                  <h5 className="mt-2 ml-3">Split by amounts</h5>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    {list.map((f, i) => {
                      return (
                        <li key={i} className="flex align-items-center m-2">
                          <img
                            src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey47-50px.png"
                            alt=""
                          />
                          <span className="ml-2 font-bold">{f}</span>
                          <span className="absolute right-5 ">
                            <span
                              style={{
                                backgroundColor: "#EEEEEE",
                                paddingLeft: "14px",
                                paddingRight: "14px",
                                border: "1px solid #ccc",
                                borderRadius: "4px 0px 0px 4px",
                              }}
                            >
                              ₹
                            </span>
                            <input
                              type="number"
                              // value={Math.abs(listobj[f])}
                              id="InputId"
                              style={{
                                width: "60px",
                                border: "1px solid #ccc",
                                borderRadius: "0px 4px 4px 0px",
                                height: "23.33px",
                              }}
                              className={
                                amount === "err" ? "text-red-500" : null
                              }
                              onChange={(e) => {
                                distriamount(e, i);
                              }}
                            />
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* <div className="mt-2 ml-3">
                  <h5>Total:</h5>
                  <span className="absolute right-10 bottom-0 ">₹{total}</span>
                </div> */}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SplitModal;
