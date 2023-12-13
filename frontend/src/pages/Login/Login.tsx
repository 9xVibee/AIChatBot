/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  // Handling login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading("Signing In!", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In", { id: "login" });
    } catch (err) {
      console.log(err);
      toast.error("Signed In Failed", { id: "login" });
    }
  };
  return (
    <div className="login-div">
      <form className="form-field-login" onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Login</h1>
          <p>Enter your email</p>
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
          login
        </button>
        <div className="no-account-yet">
          <p>Don't have account?🤔</p>
          <Link to={"/signup"}>
            <button className="signup-button">Sign Up!</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
