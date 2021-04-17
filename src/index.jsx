import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

import { FireContext } from "./utils/fireContext";
import { firebase } from "./utils/firebase";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FireContext.Provider value={{ firebase }}>
        <App />
      </FireContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
