import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import PokedexScreen from '../screens/PokedexScreen'

const Stack = createNativeStackNavigator()

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokedex" component={PokedexScreen} options={{ title: "Pokedex "}} />
    </Stack.Navigator>
  )
}