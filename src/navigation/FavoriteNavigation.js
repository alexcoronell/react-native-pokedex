import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import FavoriteScreen from '../screens/FavoriteScreen'

const Stack = createNativeStackNavigator()

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ title: "Favoritos "}} />
    </Stack.Navigator>
  )
}