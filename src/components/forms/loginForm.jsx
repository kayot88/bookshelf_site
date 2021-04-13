import React from "react";
import { useAsync } from "../hooks/useAsync";
import { FormGroup, Input } from "./loginFormStyles";

export function LoginForm({ takeFormData, submitButton }) {
  const isLoading = false;
  const isSuccess = false;
  // const { firebase } = useContext(FirebaseContext);
  // const user = firebase.auth().currentUser || {};
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    takeFormData({
      email: email.value,
      password: password.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <Input type="text" id="email" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" />
        </FormGroup>
        <div>{React.cloneElement(submitButton, { type: "submit" })}</div>
      </form>
      {/* <SearchComponent /> */}
    </div>
  );
}
