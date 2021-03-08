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
import Modal from "../components/modal/Modal";
import ModalOpenButton from "../components/modal/ModalOpenButton";
import ModalContents from "../components/modal/ModalContents";

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

            <ModalContents title="Login">
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
            <ModalContents title="Register">
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
