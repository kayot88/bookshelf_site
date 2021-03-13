import React from "react";
import SearchComponent from "../search/SearchComponent";
import { Button, FormGroup, Input, Spinner } from "./loginFormStyles";

export function LoginForm({ takeFormData, submitButton }) {
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
        <div>
          {React.cloneElement(submitButton, { type: "submit" })} <Spinner />
        </div>
      </form>
      <SearchComponent />
    </div>
  );
}
