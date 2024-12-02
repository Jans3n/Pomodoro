import React from "react";
import './NavigationBar.css';
import { Link } from "react-router-dom";

function NavigationBar({}) {

  return (
    <>
      <nav className="navBar">
        <div className="navbar-left">
          <h1>/Jans3n</h1>
        </div>
        <div className="navbar-center">
          <h1>Pomodoro Timer</h1>
        </div>
        <div className="navbar-right">
          <div className="navbar-signup">
            <Link to="/register">
              <button className="signupButton">Signup</button>
            </Link>
          </div>
          <div className="navbar-login">
          <Link to="/login">
            <button className="loginButton"> Login</button>
          </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
export default NavigationBar
