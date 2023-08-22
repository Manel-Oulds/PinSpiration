import React, { useDebugValue } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SplashPage from "./components/SplashPage/index.js";
import EditProfile from "./components/ProfilePage/ProfilePage.js";
import UserProfile from "./components/UserProfile/index.js";
import Pin from "./components/PinForm/index.js";
import BoardShowIndex from "./components/BoardShowIndex/index.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import SearchPage from "./components/SearchResult/index.js";
import UserError from "./components/UserEror/index.js";

function App() {
  return (
    <>
      <Switch>
      <Route exact path="/users/error">
          <UserError />
        </Route>
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
        <Route exact path="/search">
          <SearchPage />
        </Route>
        
      </Switch>
    </>
  );
}

export default App;
