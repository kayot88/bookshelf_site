import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./bootstrap-reboot.css";
import { useAsync } from "./components/hooks/useAsync";

import { FullPageSpinner } from "./components/search/SearchStyles";
import {AuthenticatedApp} from "./containers/AuthenticatedApp";
import UnAuthenticatedApp from "./containers/UnAuthenticatedApp";
import { FireContext } from "./utils/fireContext";

const App = () => {
  const { firebase } = useContext(FireContext);
  // console.log("firebase", firebase);
  const getUser = async () => {
    const user = (await firebase.auth().currentUser) || {};

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      return null;
    }
    return user;
  };
  const {
    isLoading,
    isError,
    isSuccess,
    setData,
    error,
    status,
    data: user,
    isIdle,
    run,
  } = useAsync();
  // console.log(status);
  useEffect(() => {
    run(getUser());
    if (!user) {
      return setData(null);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      return setData(user);
    }
  }, []);
  console.log(status);
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <div>{"Some error..."}</div>;
  }

  if (isSuccess) {
    return user ? (
      <Router>
        <AuthenticatedApp user={user} />
      </Router>
    ) : (
        <UnAuthenticatedApp />
    );
  }
  return null;
};

export default App;
