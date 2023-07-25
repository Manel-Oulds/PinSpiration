import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./UpdateForm.css";

function UpdateFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLoad, setShowLoad] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const currentDate = new Date();
  let err = false;

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
        {emailPattern.test(username) && username.length > 0 && (err = true) && (
          <p>
            <i class="fa-solid fa-triangle-exclamation"></i>
            Hmm...Username can't be an email.
          </p>
        )}
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
        {currentDate.getFullYear() - new Date(birthdate).getFullYear() < 12 &&
          (err = true) && <p>Oops! Please use a valid age to sign up.</p>}

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
        {password.length < 6 && password.length > 0 && (err = true) && (
          <p>
            <i class="fa-solid fa-triangle-exclamation"></i>The password you
            entered is too short.
          </p>
        )}

        <button
          className="submit"
          type="submit"
          disabled={err}
          style={{
            backgroundColor: err ? "gray" : "red",
          }}
        >
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

export default UpdateFormPage;
