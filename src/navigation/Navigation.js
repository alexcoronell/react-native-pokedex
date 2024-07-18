import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AccountScreen from '../screens/AccountScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import PokedexScreen from '../screens/PokedexScreen'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Pokedex" component={PokedexScreen} />
    </Tab.Navigator>
  )
}