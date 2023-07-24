import React from "react";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage/index.js";

function App() {
  return (
    <>
      <Switch>
        
        {/* <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route> */}
        <Route exact path="/">
          <SplashPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
