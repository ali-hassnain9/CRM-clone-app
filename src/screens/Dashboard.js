import React from 'react'
import { View, SafeAreaView, StyleSheet, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LeadCard } from '../components/LeadCard'


export const Dashboard = ({route}) => {
  const navigation = useNavigation();
  console.log(route)
  return(
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>Dashboard</Text>
      <Button title="Bye" onPress={()=> {navigation.goBack()}}></Button>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  main:{
    flex:1,alignItems:'center',justifyContent:'center'
  },
  text:{
    fontSize:40,
    fontWeight:'bold',
    color:'#0e53e6',
    marginVertical:20
  },

  
});
