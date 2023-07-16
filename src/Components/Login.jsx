import React from "react";

export const Login = (props) => {
  console.log("ShowNAM " + props.ShowNotAuthorized);
  return (
    <div className="loginContainer">
      <h1>Welcome to Smart Voting System</h1>
      <button className="loginButton" onClick={props.connectAccount}>
        Login Metamask
      </button>
      <div>
        {" "}
        {props.ShowNotAuthorized ? <p>You are not authorized</p> : <></>}
      </div>
    </div>
  );
};
