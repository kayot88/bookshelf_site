import React from 'react';
import { callAll } from "../../../utils/utils";

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  };

  return {
    on,
    toggle,
    getTogglerProps,
  };
}

export { useToggle };