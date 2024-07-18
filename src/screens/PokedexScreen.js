import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getPokemonApi } from '../api/pokemon'

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    (async () => await loadPokemons())()
  }, [])

  const loadPokemons = async() => {
    try {
      const pokemons = await getPokemonApi()
      setPokemons(await pokemons)
      console.log(pokemons)
    } catch(e) {
      console.error(e)
    }
  }
  return (
    <View>
      <Text>PokedexScreen</Text>
      <Text>Name: {pokemons[0]?.name}</Text>
    </View>
  )
}