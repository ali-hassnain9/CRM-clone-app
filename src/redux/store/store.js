import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import allReducers from '../reducers/index'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['LoggedInUser'],
}
const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
