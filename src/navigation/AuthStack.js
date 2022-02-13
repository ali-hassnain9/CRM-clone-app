import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screens/LoginScreen'
import { BottomTabs } from './BottomTabs'
import {useSelector} from 'react-redux';



const Stack = createNativeStackNavigator()

export const AuthStack = () => {
  const userStatus = useSelector(state => state.LoggedInUser.loggedInUser.status)
  // const userStatus = 200
  return (
    <>
      {
        userStatus === 200 ? (
          <Stack.Navigator>
            <Stack.Screen options={{
              headerShown: false,
            }} name="BottomTabs" component={BottomTabs}/>
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
