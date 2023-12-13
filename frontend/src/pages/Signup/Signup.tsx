/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handling signup
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="login-div">
      <form className="form-field-signup" onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Sign Up</h1>
          <p>Enter your email</p>
        </div>
        <div className="email-login">
          <label>Full Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="email-login">
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="email-login">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Sign Up
        </button>
        <div className="no-account-yet">
          <p>Already a customer?🤩</p>
          <Link to={"/auth/login"}>
            <button className="signup-button">Login!</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
