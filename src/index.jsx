import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { FireContext } from "./utils/fireContext";
import { firebase } from "./utils/firebase";

ReactDOM.render(
  <React.StrictMode>
    <FireContext.Provider value={{ firebase }}>
      <App />
    </FireContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
