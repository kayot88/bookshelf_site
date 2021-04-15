import React, { createContext, useState } from "react";

export  const ModalContext = createContext();

export const Modal = (props) => {
  // console.log(props);
  const [isOpen, setIsOpen] = useState(false);
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
};

export default Modal;
