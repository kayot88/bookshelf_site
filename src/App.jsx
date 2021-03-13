import React, { useContext, useEffect, useState } from "react";
import "./bootstrap-reboot.css";
import AuthenticatedApp from "./containers/AuthenticatedApp";
import UnAuthenticatedApp from "./containers/UnAuthenticatedApp";
import { useHookLocalStorage } from "./utils/auth";
import { FireContext } from "./utils/fireContext";

const App = () => {
  const { firebase } = useContext(FireContext);
  // localStorage.setItem("authUser", JSON.stringify(user));
  const [user, setUser] = useHookLocalStorage("authUser");
  // const newUser = firebase.auth().currentUser || {};
  useEffect(() => {
    if (!user) {
      return setUser(null);
    } else {
      return setUser(user);
    }
  }, []);
  return user ? <AuthenticatedApp user={user} /> : <UnAuthenticatedApp />;
  // return <UnAuthenticatedApp />;
};

export default App;
