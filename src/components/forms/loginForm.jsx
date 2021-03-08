import React from "react";
import { Button, FormGroup, Input } from "./loginFormStyles";

export function LoginForm({ takeFormData, submitButton }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    takeFormData({
      urername: username.value,
      password: password.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="username">Username</label>
          <Input type="text" id="username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" />
        </FormGroup>
        <div>{React.cloneElement(submitButton, { type: "submit"} )}</div>
        
      </form>
    </div>
  );
}
