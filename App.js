import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './src/navigation/AuthStack'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

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
