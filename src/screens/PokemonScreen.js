import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import useAuth from "../hooks/useAuth";

import { getPokemonDetailsApi } from "../api/pokemon";

import Header from "../components/Pokemon/Header";
import Favorite from "../components/Pokemon/Favorite";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";

export default function PokemonScreen(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id} />,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#FFF"
          size={20}
          style={{ marginLeft: 5 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  useEffect(() => {
    (async () => await loadPokemon())();
  }, [params]);

  const loadPokemon = async () => {
    try {
      const response = await getPokemonDetailsApi(params.id);
      setPokemon(response);
    } catch (error) {
      navigation.goBack();
    }
  };

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
