import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

export const Dashboard = ({ route }) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Dashboard</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0e53e6',
    marginVertical: 20
  },
  
})
