import React, { useReducer } from "react";
import { callAll } from "../../../utils/utils";

const actionsTypes = {
  toggle: "TOGGLE",
  reset: "RESET",
};

const toggleReducer = (state, action) => {
  switch (action.type) {
    case actionsTypes.toggle:
      return { ...state, on: !state.on };
    case actionsTypes.reset:
      return {...state, ...action.payload};
    default:
      throw new Error(`no ${actionsTypes} found`);
  }
};

function useToggle({ reducer = toggleReducer } = {}) {
  const [{ on }, dispatch] = useReducer(reducer, {
    on: false,
    reset: 0
  });

  const toggle = () => dispatch({ type: "TOGGLE" });
  const reset = () => dispatch({ type: "RESET" });

  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  };
  const getReseterProps = ({ onClick, ...props } = {}) => {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  };

  return {
    on,
    toggle,
    getTogglerProps,
    getReseterProps,
  };
}

export { useToggle, actionsTypes, toggleReducer };
