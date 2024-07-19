import { FlatList, StyleSheet } from 'react-native'
import React from 'react'

import PokemonCard from './PokemonCard'

export default function PokemonList(props) {
    const { pokemons } = props
  return (
    <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
     />
  )
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
        paddingVertical: 50
    }
})