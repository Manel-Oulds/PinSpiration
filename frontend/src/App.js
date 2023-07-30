import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage/index.js";
import EditProfile from "./components/ProfilePage/ProfilePage.js";
import UserProfile from "./components/UserProfile/index.js";
import Pin from "./components/PinForm/index.js";
import BoardForm from "./components/BoardForm/index.js";
function App() {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/pin/edit">
          <Pin />
        </Route>
        <Route path="/edit">
          <EditProfile />
        </Route>
        {
          <Route path={`/users/:userId`}>
            <UserProfile />
          </Route>
        }
      </Switch>
    </>
  );
}

export default App;
