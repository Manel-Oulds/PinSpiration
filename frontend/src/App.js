import React, { useDebugValue } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SplashPage from "./components/SplashPage/index.js";
import EditProfile from "./components/ProfilePage/ProfilePage.js";
import UserProfile from "./components/UserProfile/index.js";
import Pin from "./components/PinForm/index.js";
import BoardShowIndex from "./components/BoardShowIndex/index.js";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route exact path="/pin/edit">
          <Pin />
        </Route>
        <Route exact path="/edit">
          <EditProfile />
        </Route>

        <Route exact path={`/users/:userId`}>
          <UserProfile />
        </Route>

        <Route exact path={`/users/:userId/boards/:boardId`}>
          <BoardShowIndex />
        </Route>
      </Switch>
    </>
  );
}

export default App;
