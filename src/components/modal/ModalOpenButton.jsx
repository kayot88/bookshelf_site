import React, { useContext } from "react";
import { callAll } from "../../utils/utils";
import { ModalContext } from "./Modal";


const ModalOpenButton = ({ children: child }) => {
  const [isOpen, setIsOpen] = useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
};

export default ModalOpenButton;
