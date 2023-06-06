import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/home")
    }
  };

  const demoUser1 = async (e) => {
    let email = "demo@aa.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/home")
    }
  }

  const demoUser2 = async (e) => {
    let email = "marnie@aa.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/home")
    }
  }

  const demoUser3 = async (e) => {
    let email = "bobbie@aa.io"
    let password = "password"
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.push("/home")
    }
  }

  return (
    <>
      <div id="form-container">
        <h1 className="form-title">Welcome Back!</h1>
        <form className="form-box" onSubmit={handleSubmit}>
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="signup-labels">
            Email
            <input
              type="text"
              className="input-area"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="signup-labels">
            Password
            <input
              type="password"
              className="input-area"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button id="form-button" type="submit">Log In</button>
          <div className="demo-wrapper">
            <div className="demo-users">
              <div className="demo-user">
                <div className="demo-top">
                  <img className="demo-image" src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1685933711/P2/photo-1685125215121-4291770b4668_oln6ld.jpg" alt="woman"></img>
                  <h3 className="demo-title">Demo User 1</h3>
                </div>
                <button type="button" className="demo-login-button" onClick={demoUser1}>Log in</button>
              </div>
              <div className="demo-user">
                <div className="demo-top">
                  <img className="demo-image" src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1685933763/P2/photo-1685118148066-da2c5c61e291_dvdcp0.jpg" alt="man"></img>
                  <h3 className="demo-title">Demo User 2</h3>
                </div>
                <button type="button" className="demo-login-button" onClick={demoUser2} >Log in</button>
              </div>
              <div className="demo-user">
                <div className="demo-top">
                  <img className="demo-image" src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1685933727/P2/photo-1683646237782-ce1378fbffcb_tnflh3.jpg" alt="woman"></img>
                  <h3 className="demo-title">Demo User 3</h3>
                </div>
                <button type="button" className="demo-login-button" onClick={demoUser3}>Log in</button>
              </div>
            </div>

          </div>
        </form>

      </div>
    </>
  );
}

export default LoginFormModal;
