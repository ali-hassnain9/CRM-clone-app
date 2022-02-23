import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screens/LoginScreen'
import { BottomTabs } from './BottomTabs'
import {useSelector} from 'react-redux';
import FilterScreen from '../screens/FilterScreen'



const Stack = createNativeStackNavigator()

export const AuthStack = () => {
  const userStatus = useSelector(state => state.LoggedInUser.loggedInUser.status)
  return (
    <>
      {
        userStatus ? (
          <Stack.Navigator>
            <Stack.Screen options={{
              headerShown: false,
            }} name="BottomTabs" component={BottomTabs}/>
            <Stack.Screen name="FilterScreen" component={FilterScreen} options={{
              headerShown: false,
            }}/>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen options={{
              headerShown: false,
            }} name="LoginScreen" component={LoginScreen}/>
          </Stack.Navigator>
        )
      }
    </>
  )
}
