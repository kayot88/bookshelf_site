import React, { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    ...(typeof action === "function" ? action(state) : action),
  };
}

export function Counter({ initialCount = 0, step = 8 }) {
  const [state, setState] = useReducer(reducer, {
    count: initialCount,
  });

  const { count } = state;

  const decrement = () => setState({ count: count - step });
  const increment = () =>
    setState((curreentState) => {
      return {
        count: curreentState.count + step,
      };
    });

  return (
    <>
      <button onClick={increment}>{count}Inc</button>
      <button onClick={decrement}>{count}Dec</button>
    </>
  );
}
