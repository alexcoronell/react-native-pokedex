import { View } from "react-native";
import React, { useState, useEffect } from "react";

/* API */
import { getPokemonApi, getPokemonDetailsByUrlApi } from "../api/pokemon";

/* Components */
import PokemonList from "../components/PokemonList";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    (async () => await loadPokemons())();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi();
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const res = await getPokemonDetailsByUrlApi(pokemon.url);
        const pokemonDetail = {
          id: res.id,
          name: res.name,
          type: res.types[0].type.name,
          order: res.order,
          image: res.sprites.other["official-artwork"].front_default,
        };
        pokemonsArray.push(pokemonDetail);
      }
      setPokemons(await pokemonsArray)
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View>
      <PokemonList pokemons={pokemons} />
    </View>
  );
}
