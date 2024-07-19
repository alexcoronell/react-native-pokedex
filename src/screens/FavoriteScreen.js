import React, { useState, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { getPokemonFavoriteApi } from "../api/favorite";
import { getPokemonDetailsApi } from "../api/pokemon";

import PokemonList from "../components/PokemonList";

export default function FavoriteScreen() {
  const { auth } = useAuth();
  const [pokemons, setPokemons] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (!auth) return;
      (() => getFavorites())();
    }, [auth])
  );

  const getFavorites = async () => {
    try {
      const response = await getPokemonFavoriteApi();
      const pokemonsArray = [];
      for await (const id of response) {
        const res = await getPokemonDetailsApi(id);
        const pokemonDetail = {
          id: res.id,
          name: res.name,
          type: res.types[0].type.name,
          order: res.order,
          image: res.sprites.other["official-artwork"].front_default,
        };
        pokemonsArray.push(pokemonDetail);
        setPokemons(await pokemonsArray);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return !auth ? (
    <Text>Usuario no logueado</Text>
  ) : (
    <PokemonList pokemons={pokemons} />
  );
}
