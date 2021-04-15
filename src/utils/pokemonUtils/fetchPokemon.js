import React from 'react';


const formatDate = (date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;

export function fetchPokemon2(name, delay = 1500) {
  // console.log("name", name);
   const pokemonQuery = `
    query PokemonInfo($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `;

  return window
    .fetch("https://graphql-pokemon2.vercel.app/", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        delay: delay,
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: { name: name.toLowerCase() },
      }),
     })
    .then(async (response) => {
      const { data } = await response.json();
      // console.log("data", data);
      if (response.ok) {
        const { pokemon } = data || null;
        if (pokemon) {
          pokemon.fetchedAt = formatDate(new Date());
          return pokemon;
        } else {
          return Promise.reject(new Error(`No such pokemon as ${name} found`));
        }
      } else {
        const errors = {
          errors: data?.errors?.map((er) => er.message).join("/n"),
        };
        errors ? (
          <div>{errors}</div>
        ) : (
          Promise.reject(new Error("no data found"))
        );
      }
    });
}
// fetchPokemon("mew");
