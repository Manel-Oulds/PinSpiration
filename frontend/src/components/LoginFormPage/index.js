import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLoad, setShowLoad] = useState(false);
  const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let err = false;

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    setShowLoad(true);
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        setShowLoad(false);
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );

    
  };

  const handleDemo = (e) => {
    setShowLoad(true);
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  return (
    <div className="login-div">
      <img src="Frame_new.svg" alt="Logo" className="logo" />

      <div className="title">Welcome to PinSpiration</div>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="username">
          <label>
            <div>Email</div>
            <div>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </label>
        </div>
        {!(emailPattern.test(credential))  && (credential.length > 0)&&(err = true) &&
        
         <p><i class="fa-solid fa-triangle-exclamation"></i>
         Hmm...that doesn't look like an email address.</p>}

        <div className="password">
          <label>
            <div> Password</div>

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
        {(password.length < 6 && password.length > 0) && (err = true) &&
         <p><i class="fa-solid fa-triangle-exclamation"></i>The password you entered is incorrect.</p>}

        <button className="submit" type="submit" disabled={err} 
        style={{ backgroundColor: err ? 'gray' : 'red'}}>
          Log in
        </button>
        <div className="or"> or </div>
        <button className="demo" onClick={handleDemo}>
          Demo user
        </button>
        <div className="loading">
          {showLoad && <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>}
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
