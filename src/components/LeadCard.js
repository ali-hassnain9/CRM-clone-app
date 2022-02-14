import React from 'react'
import { View, Text, Image,StyleSheet } from 'react-native'
import { IC_BUYER, IC_MODERATE } from '../../assets'

export const LeadCard = (props) => {
  return (
    <View style={{ backgroundColor:'#fff',marginHorizontal:20,marginVertical:5,paddingVertical:15,borderRadius:5}}>
      <View style={{ marginVertical:15,justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginHorizontal: 20,alignItems:'center' }}>
        <View>
          <Text style={{color:'#bebebe'}}>Lead ID: {props.leadID}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{props.name}</Text>
        </View>
        
        <View style={{ backgroundColor: '#e2fbff',padding:10 ,borderRadius:20,alignItems:'center'}}>
          <Text style={{ color: '#288dbc' }}>In progress</Text>
        </View>
      </View>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={IC_MODERATE} resizeMode={'contain'} style={{ height: 20, width: 20 ,marginEnd:5}}/>
          <Text style={{color:'#6c6c6c',marginEnd:5}}>{props.classification}</Text>
          <View style={{ height: 15, borderWidth: 0.5 ,color:'#6c6c6c',marginLeft:5,marginRight:10}}/>
          <Image source={IC_BUYER} resizeMode={'contain'} style={{ height: 20, width: 20,marginEnd:5 }}/>
          <Text>{props.buyer}</Text>
        </View>
        <Text style={{color:'#848c98',fontSize:12}}>{props.date}</Text>
      </View>
    </View>
  
  )
}
const styles = StyleSheet.create({

})

