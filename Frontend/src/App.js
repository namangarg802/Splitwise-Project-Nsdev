import { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { MyAlert } from "./Components/AlertContext";
import { AuthContext } from "./Components/AuthContext";
import Dashboard from "./Components/Dashboard";
import { UserContext } from "./Components/UserContext";
import { AllUserContext } from "./Components/UserContext";
import { UserFriendContext } from "./Components/UserContext";
import { BalanceContext } from "./Components/UserContext";
import { ExpenseContext } from "./Components/UserContext";
import { DateContext } from "./Components/UserContext";
import Loggedout from "./Components/Loggedout";
import { ListContext } from "./Components/UserContext";
function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [allusers, setAll] = useState([]);
  const [userfriend, setuserfriend] = useState([]);
  const [date, setDate] = useState("naman");
  const [usrbalance, setBalance] = useState();
  const [expense, setExpense] = useState([]);
  const [listobj, setlistobj] = useState({ exp: {} });
  const myname = [];
  // const [t,sett]=useState(1);
  // useEffect(() => {
  //   const timer=setTimeout(() => {
  //     sett(t+1)
  //   }, 1000);
  //   // Clear timeout if the component is unmounted
  //   return () => clearTimeout(timer);
  // });
  const getuser = async (e) => {
    const response = await fetch(
      "https://splitwise-backend-1.herokuapp.com/api/auth/fetchuser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    console.log(json);
    setUser(json);
    setuserfriend(json.friends);
    setBalance(json.balance);
    setExpense(json.expenses);
    // console.log(userfriend);
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getuser();
      // console.log("naman gar");
    }
    return () => {
      unmounted = true;
    };
  }, [auth]);
  useEffect(() => {
    getuser();
  }, []);
  // console.log(user.friends, "kutta");
  const getallusers = async (e) => {
    const response = await fetch(
      "https://splitwise-backend-1.herokuapp.com/api/auth/fetchalluser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    // console.log(json);
    json.map((u) => {
      myname.push(u.name);
      // console.log(myname);
      setAll(myname);
    });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);

      getallusers();

      console.log("auth is true");
    } else {
      console.log("Auth is false");
    }
  }, [auth]);
  return (
    <>
      <Router>
        <MyAlert>
          <ListContext.Provider value={{ listobj, setlistobj }}>
            <DateContext.Provider value={{ date, setDate }}>
              <AllUserContext.Provider value={{ allusers, setAll }}>
                <UserContext.Provider
                  value={{
                    user,
                    setUser,
                    setuserfriend,
                    userfriend,
                    usrbalance,
                    setBalance,
                    expense,
                    setExpense,
                  }}
                >
                  <AuthContext.Provider value={{ auth, setAuth }}>
                    <Navbar />
                    <Switch>
                      <Route path="/" component={Home} exact></Route>
                      <Route path="/Login" component={Login} exact></Route>
                      <Route path="/Signup" component={Signup} exact></Route>

                      <Route
                        path="/Dashboard"
                        component={auth ? Dashboard : Loggedout}
                        exact
                      ></Route>
                    </Switch>
                  </AuthContext.Provider>
                </UserContext.Provider>
              </AllUserContext.Provider>
            </DateContext.Provider>
          </ListContext.Provider>
        </MyAlert>
      </Router>
    </>
  );
}

export default App;
