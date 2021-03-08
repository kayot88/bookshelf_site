import React from "react";
import { Button, FormGroup, Input } from "./loginFormStyles";

export function LoginForm({ textButton, takeFormData }) {
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
        <Button type="submit" variant="primary" style={{marginTop: "15px"}}>{textButton}</Button>
      </form>
    </div>
  );
}
