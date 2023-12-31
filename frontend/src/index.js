import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store";
import csrfFetch, { restoreCSRF } from "./store/csrf";
import * as sessionActions from "./store/session";
import { ModalProvider } from "./components/context/Modal";
import { ModalFollowProvider } from "./components/context/ModalFollow";

const store = configureStore();
if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}
function Root() {
  return (
    <ModalFollowProvider>
      <ModalProvider>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReduxProvider>
      </ModalProvider>
    </ModalFollowProvider>
  );
}
const renderApplication = () => {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
};

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
