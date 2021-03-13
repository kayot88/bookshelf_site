import "@reach/dialog/styles.css";
import React, { useContext, useEffect, useState } from "react";
import { LoginForm } from "../components/forms/loginForm";
import {
  Button,
  LoginFormWrapper,
  Wrapper,
} from "../components/forms/loginFormStyles";
import Modal from "../components/modal/Modal";
import ModalContents from "../components/modal/ModalContents";
import ModalOpenButton from "../components/modal/ModalOpenButton";
import { Logo } from "../svg/logo";
import { login } from "../utils/auth";
import { FireContext } from "../utils/fireContext";

export const LoginFormContainer = () => {
  // const [openModal, setOpenModal] = useState("none");
  const { firebase } = useContext(FireContext);

  const login = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        localStorage.setItem("authUser", JSON.stringify(res.user));
      })
      .catch((error) => console.log("error.message: ", error.message));
  };
  const register = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) =>
        localStorage.setItem("authUser", JSON.stringify(res.user))
      );
  };

  return (
    <Wrapper>
      <LoginFormWrapper>
        <Logo width="70" height="70" />
        <h1>Bookshelf</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gridGap: "0.75rem",
          }}
        >
          <Modal>
            <ModalOpenButton>
              <Button variant="primary">Login</Button>
            </ModalOpenButton>

            <ModalContents aria-label="Login form" title="Login">
              <LoginForm
                takeFormData={login}
                submitButton={
                  <Button variant="primary" style={{ marginTop: "15px" }}>
                    Login
                  </Button>
                }
              />
            </ModalContents>
          </Modal>
          <Modal>
            <ModalOpenButton>
              <Button variant="primary">Register</Button>
            </ModalOpenButton>
            <ModalContents aria-label="Registration form" title="Register">
              <LoginForm
                takeFormData={register}
                submitButton={
                  <Button variant="primary" style={{ marginTop: "15px" }}>
                    Register
                  </Button>
                }
              />
            </ModalContents>
          </Modal>
        </div>
      </LoginFormWrapper>
    </Wrapper>
  );
};
