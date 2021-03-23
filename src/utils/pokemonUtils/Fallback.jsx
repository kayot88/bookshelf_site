import React, { useRef } from "react";
import PokemonContainer from "../../containers/PokemonContainer";

const Fallback = ({ name }) => {
  const initialName = useRef(name).current;

  const pokemonFallback = {
    name:initialName,
    number: "XXX",
    attacks: {
      special: [
        {name: "Loading Attack 1", damage: "damage", type: "type",},
        {name: "Loading Attack ", damage: "damage", type: "type",}
      ]
    },
    fetchedAt: "is loading"
  }
  return <PokemonContainer pokemon={pokemonFallback}/>;
};

export { Fallback };
