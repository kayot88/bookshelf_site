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
    </div>
  );
};

export default App;
