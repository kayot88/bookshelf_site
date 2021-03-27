import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./bootstrap-reboot.css";
import  './app.css';
// import { Counter } from "./components/counter/counter";
import { useIdle } from "./components/hooks/useIdle";
import AuthenticatedApp from "./containers/AuthenticatedApp";
import PokemonContainer from "./containers/PokemonContainer";
import UnAuthenticatedApp from "./containers/UnAuthenticatedApp";
import { useHookLocalStorage } from "./utils/auth";
import { WrapperErrorBoundary } from "./utils/ErrorBoundary";
import { Fallback } from "./utils/pokemonUtils/Fallback";
import { fetchPokemon2 } from "./utils/pokemonUtils/fetchPokemon";
// import "./styles/toggler.css";
import { Toggler } from "./components/toggler";
let content;
const asyncReducer = (state, action) => {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return {
        status: "resolved",
        data: action.data,
        error: null,
      };
    }
    case "rejected": {
      return {
        status: "rejected",
        data: null,
        error: action.error,
      };
    }
    default:
      throw new Error(`no such action ${action.type} found`);
  }
};

const useSafeDispatch = (dispatch) => {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, [dispatch]);

  return useCallback(
    (...args) => {
      if (mountedRef) {
        return dispatch(...args);
      }
    },
    [dispatch]
  );
};

const useAsync = (initialState) => {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: "idle",
    error: null,
    data: null,
    ...initialState,
  });
  const dispatch = useSafeDispatch(unsafeDispatch);
  const run = useCallback(
    (promise) => {
      if (!promise) {
        return;
      }
      dispatch({ type: "pending" });
      promise.then(
        (data) => dispatch({ type: "resolved", data }),
        (error) => dispatch({ type: "rejected", error })
      );
    },
    [dispatch]
  );

  return { ...state, run };
};

const PokemonInfo = ({ name, handleSubmit }) => {
  const state = useAsync({ status: name ? "pending" : "idle" });
  const { data: pokemon, status, error, run } = state;

  useEffect(() => {
    if (!name) {
      return;
    } else {
      return run(fetchPokemon2(name));
    }
  }, [name, run]);

  if (status === "idle" || !name) {
    return "Submit a pokemon";
  } else if (status === "pending") {
    return <Fallback name={name} />;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return <PokemonContainer pokemon={pokemon} onSubmit={handleSubmit} />;
  }

  throw new Error("This should be impossible");
};

/* Toggler */
const noop = () => {};

function Switch({
  on,
  className = "",
  "aria-label": ariaLabel,
  onClick,
  ...props
}) {
  const btnClassName = [
    className,
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <label aria-label={ariaLabel || "Toggle"} style={{ display: "block" }}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={noop}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName} {...props} />
    </label>
  );
}

const actionTypes = {
  toggle: "TOGGLE",
  on: "ON",
  off: "OFF",
};

function toggleReducer(state, action) {
  switch (action.type) {
    case actionTypes.toggle: {
      return { on: !state.on };
    }
    case actionTypes.on: {
      return { ...state, on: true };
    }
    case actionTypes.off: {
      return { ...state, on: false };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useToggle({ reducer = toggleReducer } = {}) {
  const [{ on }, dispatch] = React.useReducer(reducer, { on: false });

  const toggle = () => dispatch({ type: actionTypes.toggle });
  const setOn = () => dispatch({ type: actionTypes.on });
  const setOff = () => dispatch({ type: actionTypes.off });

  return { on, toggle, setOn, setOff };
}

// export {useToggle, toggleReducer, actionTypes}

// import {useToggle, toggleReducer, actionTypes}
function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0);
  const tooManyClicks = clicksSinceReset >= 4;

  const { on, toggle, setOn, setOff } = useToggle({
    reducer(currentState, action) {
      const changes = toggleReducer(currentState, action);
      if (tooManyClicks && action.type === actionTypes.toggle) {
        // other changes are fine, but on needs to be unchanged
        return { ...changes, on: currentState.on };
      } else {
        // the changes are fine
        return changes;
      }
    },
  });

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch
        onClick={() => {
          toggle();
          setClicksSinceReset((count) => count + 1);
        }}
        on={on}
      />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  );
}

/* Toggler */

const App = () => {
  const [pokemonName, setPokemonName] = React.useState("mew");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

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
      {/* <Counter /> */}
      <Toggler />
      <WrapperErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
        <PokemonInfo name={pokemonName} handleSubmit={handleSubmit} />
      </WrapperErrorBoundary>
      <div>
        <div class="a b c"></div>
      </div>
      {/* <Toggle /> */}
    </div>
  );
};

export default App;
