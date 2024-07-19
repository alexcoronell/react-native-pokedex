import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  addPokemonFavoriteApi,
  isPokemonFavoriteApi,
  removePokemonFavoriteApi
} from "../../api/favorite";

export default function Favorite(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadCheck, setReloadCheck] = useState(false);
  const { id } = props;
  const Icon = isFavorite ? FontAwesome : FontAwesome5;

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(id);
        setIsFavorite(await response);
      } catch (e) {
        setIsFavorite(false);
      }
    })();
  }, [id, reloadCheck]);

  const onReloadCheckFavorite = () => {
    setReloadCheck((prev) => !prev);
  };

  const addFavorite = async () => {
    try {
      await addPokemonFavoriteApi(id);
      onReloadCheckFavorite();
    } catch (e) {console.error(e)}
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(id);
      onReloadCheckFavorite();
    } catch (e) {console.error(e)}
  };

  return (
    <Icon
      name="heart"
      color="#FFF"
      size={20}
      onPress={isFavorite ? removeFavorite : addFavorite}
      style={{ marginRight: 5 }}
    />
  );
}
