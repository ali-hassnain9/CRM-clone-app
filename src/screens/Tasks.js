import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export const Tasks = ({route}) => {
  const navigation = useNavigation();
  console.log(route)
  return(
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>Tasks</Text>
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
