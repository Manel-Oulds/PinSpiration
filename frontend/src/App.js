import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/index.js";
import SignupFormPage from "./components/SignupFormPage/index.jsx";
import AnimationsSplash from "./components/SplashPage/AnimationsSplash.js";
import SplashPage from "./components/SplashPage/index.js";


function App() {
  return (
     <>
     <SplashPage/>
       <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch> 
    </>
  );
}

export default App;
