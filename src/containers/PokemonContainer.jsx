import React, { useEffect, useState } from "react";
import { Pokemon } from "../components/pokemon/pokemon";

const PokemonContainer = ({ pokemon, onSubmit }) => {
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.value);
  };

  const handleSelect = (newPokemonName) => {
    setPokemonName(newPokemonName);
    onSubmit(newPokemonName);
  };

  const handleChange = (e) => {
    setPokemonName(e.target.value);
    // onSubmit(e.target.value);
  };

  return (
    <div>
      <Pokemon>
        <Pokemon.Table>
          <form onSubmit={handleSubmit}>
            <label htmlFor="pokemonname-input">Pokemon name</label>
            <small>
              Try{" "}
              <button type="button" onClick={() => handleSelect("pikachu")}>
                "pikachu"
              </button>
              <button type="button" onClick={() => handleSelect("charizard")}>
                "charizard"
              </button>
              <button type="button" onClick={() => handleSelect("mew")}>
                "mew"
              </button>
            </small>
            <div>
              <input
                placeholder="enter pokemon mame"
                id="pokemonname-input"
                onChange={handleChange}
                value={pokemonName}
              />
              <button>Search</button>
            </div>
          </form>
        </Pokemon.Table>
        <hr />
        <Pokemon.Main>
          <div>
            <img src={pokemon.image} />
          </div>
          <section>
            <h2>
              {pokemon.name}

              <sup>{pokemon.number}</sup>
            </h2>
          </section>
          <section>
            <ul>
              {pokemon ? (
                pokemon.attacks.special.map((attack) => {
                  return (
                    <li key={attack.name}>
                      <label>{attack.name}</label>
                      <span>
                        `${attack.damage} ${attack.type}`
                      </span>
                    </li>
                  );
                })
              ) : (
                <div>...Loading</div>
              )}
            </ul>
          </section>
        </Pokemon.Main>
      </Pokemon>
    </div>
  );
};

export default PokemonContainer;
