import React, { useContext, useEffect, useReducer, useState } from "react";
import "./bootstrap-reboot.css";
import { Counter } from "./components/counter/counter";
import { useIdle } from "./components/hooks/useIdle";
import AuthenticatedApp from "./containers/AuthenticatedApp";
import UnAuthenticatedApp from "./containers/UnAuthenticatedApp";

import { useHookLocalStorage } from "./utils/auth";
import { FireContext } from "./utils/fireContext";
import {
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
} from "./pokemon";

const useAsync = (asynCallback, initialState, dependencies) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });
  useEffect(() => {
    const promise = asynCallback();
    if (!promise) {
      return;
    }
    dispatch({ type: "pending" });
    promise.then(
      (data) => {
        dispatch({ type: "resolved", data });
      },
      (error) => {
        dispatch({ type: "rejected", error });
      }
    );
  }, dependencies);
  return state;
};

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function PokemonInfo({ pokemonName }) {
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return;
      }
      return fetchPokemon(pokemonName);
    },
    { status: pokemonName ? "pending" : "idle" },
    [pokemonName]
  );

  const { data: pokemon, status, error } = state;

  if (status === "idle" || !pokemonName) {
    return "Submit a pokemon";
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />;
  }

  throw new Error("This should be impossible");
}

const App = () => {
  //pokemon
  const [pokemonName, setPokemonName] = React.useState("");
  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  //pokemon

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
      {/* pokemon */}
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
      {/* pokemon */}
    </div>
  );
};

export default App;
