import * as React from "react";
import { useToggle, actionsTypes, toggleReducer } from "./hooks/useToggler";
import { Switch } from "./index";

function Toggler() {
  const [toMuchClick, setMuchClick] = React.useState(0);
  const maxClicks = toMuchClick >= 4;

  function currentStateReducer(currentState, action) {
    if (action.type === "TOGGLE" && maxClicks) {
      return { on: currentState.on };
    }
    return toggleReducer(currentState, action);
  }

  const { on, getTogglerProps, getReseterProps } = useToggle({reducer: currentStateReducer});
  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: maxClicks,
          on: on,
          onClick: () => setMuchClick((count) => count + 1),
        })}
      />
      <hr />
      {maxClicks ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : toMuchClick > 0 ? (
        <div>Click count: {toMuchClick}</div>
      ) : null}

      <button
        {...getReseterProps({
          onClick: () => setMuchClick(0),
        })}
      >
        RESET
      </button>
    </div>
  );
}

export default Toggler;
