import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";

import useAuth from "../../hooks/useAuth";
import { getPokemonFavoriteApi } from "../../api/favorite";

export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => getTotalFavorites())();
    }, [])
  );

  const getTotalFavorites = async () => {
    try {
      const response = await getPokemonFavoriteApi();
      setTotal(size(response));
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{`${auth.firstname} ${auth.lastname}`}</Text>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstname} ${auth.lastname}`} />
        <ItemMenu title="Username" text={`${auth.username}`} />
        <ItemMenu title="Email" text={`${auth.email}`} />
        <ItemMenu title="Total Favoritos" text={`${total} Pokemos`} />
      </View>

      <Button style={styles.btnLogout} title="Desconectarte" onPress={logout} />
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
  btnLogout: {
    paddingTop: 20,
  },
});
