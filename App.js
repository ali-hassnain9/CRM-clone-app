import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStack } from './src/navigation/AuthStack'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createNativeStackNavigator()

const App = () =>
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
     <AuthStack/>
    </NavigationContainer>
      </PersistGate>
    </Provider>
  )

export default App
