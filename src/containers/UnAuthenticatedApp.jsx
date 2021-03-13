import React, { useContext } from "react";
import { FireContext } from "../utils/fireContext";
import { LoginFormContainer } from "./loginFormC";

const UnAuthenticatedApp = () => {
  return (
    <div>
      <LoginFormContainer/>
    </div>
  );
};

export default UnAuthenticatedApp;
