import "@reach/dialog/styles.css";

import React, { useState } from "react";
import { Dialog } from "@reach/dialog";
import { Logo } from "../svg/logo";
import { LoginForm } from "../components/forms/loginForm";
import {
  Button,
  CircleButton,
  FormGroup,
  StyledDialog,
  LoginFormWrapper,
  Wrapper,
  ButtonsWrapper,
  CloseButton,
} from "../components/forms/loginFormStyles";

export const LoginFormContainer = () => {
  const [openModal, setOpenModal] = useState("none");
  const login = (formData) => {
    console.log("formData", formData);
  };
  const register = (formData) => {
    console.log("formData", formData);
  };
  return (
    <Wrapper>
      <LoginFormWrapper>
        <Logo width="70" height="70" />
        <h1>Bookshelf</h1>
        <ButtonsWrapper>
          <Button onClick={() => setOpenModal("login")} variant="primary">
            Login
          </Button>
          <Button onClick={() => setOpenModal("register")} variant="secondary">
            Register
          </Button>
        </ButtonsWrapper>
      </LoginFormWrapper>
      <StyledDialog aria-label="Login form" isOpen={openModal === "login"}>
        <h1>Login form</h1>
        <LoginForm textButton="Login" takeFormData={login} />
        <CloseButton onClick={() => setOpenModal("none")}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "auto",
            }}
            aria-hidden
          >
            x
          </span>
        </CloseButton>
      </StyledDialog>
      <StyledDialog
        aria-label="Register form"
        isOpen={openModal === "register"}
      >
        <h1>Register form</h1>
        <LoginForm textButton="Register" takeFormData={register} />
        <CloseButton onClick={() => setOpenModal("none")} type="close">
          <span>x</span>
        </CloseButton>
      </StyledDialog>
    </Wrapper>
  );
};
