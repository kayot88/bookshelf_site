import React from 'react';
import { callAll } from '../../utils/utils';
import { ModalContext } from './Modal';

export const ModalDismissButton = ({ children: child }) => {
   const [, setIsOpen] = React.useContext(ModalContext);
   return React.cloneElement(child, {
     onClick: callAll(() => setIsOpen(false), child.props.onClick),
   });
};
