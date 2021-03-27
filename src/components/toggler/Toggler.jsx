import React, { useReducer, useState } from "react";
import { Switch } from ".";

const togglerReducer = (state, action) => {
  switch (action.type) {
    case togglerTypes.toggle: {
      return { ...state, on: !state.on };
    }
    case togglerTypes.on: {
      return { ...state, on: true };
    }
    case togglerTypes.off: {
      return { ...state, on: false };
    }

    default:
      throw new Error(`no such action ${action.type} found `);
    // return state
  }
};

const togglerTypes = {
  toggle: "TOGGLE",
  on: "ON",
  off: "OFF",
};

function useToggle({ reducer = togglerReducer } = {}) {
  const [state, dispatch] = useReducer(reducer, {
    on: false,
  });
  const { on } = state;
  const toggle = () => {
    return dispatch({ type: togglerTypes.toggle });
  };
  const clickOn = () => dispatch({ type: togglerTypes.on });
  const clickOff = () => dispatch({ type: togglerTypes.off });

  return {
    on,
    clickOn,
    clickOff,
    toggle,
  };
}

const Toggler = ({ ...props }) => {
  const [manyClick, setManyClick] = useState(0);
  const tooManyClicks = manyClick >= 4;
  // console.log("tooManyClicks", tooManyClicks);

  let { on, clickOn, clickOff, toggle } = useToggle({
    reducer(currentState, action) {
      console.log("currentState", currentState.on);
      const changes = togglerReducer(currentState, action);
      if (tooManyClicks && action.type === togglerTypes.toggle) {
        // other changes are fine, but on needs to be unchanged
        return { ...changes, on: currentState.on };
      } else {
        // the changes are fine
        return changes;
      }
    },
  });
  // let { on } = useToggle();
  console.log(({ on } = useToggle()));

  return (
    <div>
      <button onClick={() => clickOff()}>SwitchOff</button>
      <button onClick={() => clickOn()}>SwitchOn</button>
      <Switch
        on={on}
        onClick={() => {
          toggle();
          setManyClick((count) => count + 1);
        }}
        {...props}
      />
      {tooManyClicks ? (
        <button onClick={() => setManyClick(0)}>Reset</button>
      ) : null}
    </div>
  );
};

export default Toggler;
