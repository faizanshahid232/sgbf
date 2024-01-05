import React from "react";
import ReactDOM from "react-dom/client";
import "./Utils/styles.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./Redux/store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
