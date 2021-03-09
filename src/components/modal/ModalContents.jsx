import "@reach/dialog/styles.css";
import React from "react";
import { CircleButton, StyledDialog } from "../forms/loginFormStyles";
import { ModalContext } from "./Modal";
import { ModalDismissButton } from "./ModalDismissButton";

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return (
    <StyledDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

const ModalContents = ({ title, children, ...props }) => {
  return (
    <ModalContentsBase {...props}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ModalDismissButton>
          <CircleButton>
            {/* <VisuallyHidden>Close</VisuallyHidden> */}
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 style={{ textAlign: "center", fontSize: "2em" }}>{title}</h3>
      {children}
    </ModalContentsBase>
  );
};

export default ModalContents;
