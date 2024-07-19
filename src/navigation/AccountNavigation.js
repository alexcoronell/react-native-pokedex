import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import AccountScreen from '../screens/AccountScreen'

const Stack = createNativeStackNavigator()

export default function AccountNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: "Cuenta "}} />
    </Stack.Navigator>
  )
}