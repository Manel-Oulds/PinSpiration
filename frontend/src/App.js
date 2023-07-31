import React, { useDebugValue } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { fetchBoards } from "./store/board.js";
import { useDispatch } from "react-redux";
import SplashPage from "./components/SplashPage/index.js";
import EditProfile from "./components/ProfilePage/ProfilePage.js";
import UserProfile from "./components/UserProfile/index.js";
import Pin from "./components/PinForm/index.js";
import { fetchAllBoards } from "./store/board.js";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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
