import React, { useReducer } from 'react';
import { callAll } from "../../../utils/utils";

const actionsTypes ={
  toggle: "TOGGLE",
  reset: "RESET"
}

const toggleReducer = (state, action) => {
  switch (action.type) {
    case actionsTypes.toggle:
      return {on: !state.on }    
    case actionsTypes.reset:
      return action.payload    
    default:
      throw new Error(`no ${actionsTypes} found`)
  }
};

function useToggle({reducer=toggleReducer }={}) {

  const [{on}, dispatch] = useReducer(reducer, {
    on: false
  })
  
  const toggle = () => dispatch({type: 'TOGGLE'});
  const reset = () => dispatch({type: 'RESET'});
  
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