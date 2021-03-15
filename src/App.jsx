import React, { useContext, useEffect, useReducer, useState } from "react";
import "./bootstrap-reboot.css";
import { useIdle } from "./components/hooks/useIdle";
import AuthenticatedApp from "./containers/AuthenticatedApp";
import UnAuthenticatedApp from "./containers/UnAuthenticatedApp";
import { useHookLocalStorage } from "./utils/auth";
import { FireContext } from "./utils/fireContext";

function reducer(state, action) {
  return {
    ...state,
    ...(typeof action === "function" ? action(state) : action),
  };
}

function Counter({ initialCount = 0, step = 8 }) {
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
  )
}

const App = () => {
  const [user, setUser] = useHookLocalStorage("authUser");
  useEffect(() => {
    if (!user) {
      return setUser(null);
    } else {
      return setUser(user);
    }
  }, []);
  const isIdle = useIdle({ timeToIdle: 10000 });
  return (
    <div>
      {isIdle ? "Are you still there?" : "Hello there"}
      {user ? <AuthenticatedApp user={user} /> : <UnAuthenticatedApp />}
      <Counter />
    </div>
  );
};

export default App;
