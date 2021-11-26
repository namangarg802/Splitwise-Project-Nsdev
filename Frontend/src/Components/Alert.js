import React, { useState, useContext } from "react";
import AlertContext from "./AlertContext";
function Alert() {
  const { isalert, showAlert } = useContext(AlertContext);
  const capitalize = (word) => {
    if (word === "danger") word = "Error";
    console.log(isalert.type, isalert.msg);
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "50px", width: "100%", position: "absolute" }}>
      {isalert.msg && (
        <div className={`alert alert-${isalert.type} `} role="alert">
          <strong>{capitalize(isalert.type)}</strong>: {isalert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
