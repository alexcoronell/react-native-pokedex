import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { getPokemonFavoriteApi } from "../api/favorite";

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    (async () => {
      getFavorites();
    })();
  }, []);

  const getFavorites = async () => {
    const response = await getPokemonFavoriteApi();
    setFavorites(await response);
    console.log(response, favorites)
  };

  return (
    <View>
      <Text>FavoriteScreen</Text>
      <Button title="Obtener Favoritos" onPress={getFavorites} />
    </View>
  );
}
