import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLoad, setShowLoad] = useState(false);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    setShowLoad(true);
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.signup({ email, username, birthdate, password })
    ).catch(async (res) => {
      let data;
      setShowLoad(false);
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (!data?.errors) showLoad(true);
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  return (
    <div className="signup-div">
      <img src="Frame_new.svg" alt="Logo" className="logo" />
      <div className="title">Welcome to PinSpiration </div>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="email">
          <label>
            <div>Email</div>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>
          </label>
        </div>
        <div className="username">
          <label>
            <div>Username</div>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>
          </label>
        </div>
        <div className="birthdate">
          <label>
            <div>Birthdate</div>
            <div>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                placeholder="Birthdate"
              />
            </div>
          </label>
        </div>

        <div className="password">
          <label>
            <div>Password</div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
          </label>
        </div>

        <button className="submit" type="submit">
          Sign Up
        </button>
        <div className="loading">
          {showLoad && (
            <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
