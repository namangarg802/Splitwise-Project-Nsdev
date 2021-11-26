import { createContext, useState } from "react";
const AlertContext = createContext();
export const MyAlert = (props) => {
  const [isalert, setIsalert] = useState({ msg: "", type: "" });
  const showAlert = (message, type) => {
    setIsalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setIsalert({ msg: "", type: "" });
    }, 1500);
  };

  return (
    <AlertContext.Provider value={{ isalert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
