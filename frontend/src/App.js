import React from "react";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage/index.js";
import UpdateFormPage from "./components/UpdateProfile/UpdateProfile.js";
import EditProfile from "./components/ProfilePage/ProfilePage.js";

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
        <Route exact path="/edit">
          <EditProfile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
