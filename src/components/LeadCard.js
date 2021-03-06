import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IC_BUYER, IC_MODERATE, IC_SELLER } from '../../assets'

export const LeadCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardFirstLine}>
        <View>
          <Text style={styles.leadId}>Lead ID: {props.leadID}</Text>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        
        <View style={styles.status}>
          <Text style={styles.statusText}>{props.status}</Text>
        </View>
      </View>
      <View
        style={styles.allIconsAndDate}>
        <View style={styles.allIcons}>
          <Image source={IC_MODERATE} resizeMode={'contain'} style={styles.iconOne}/>
          <Text style={styles.iconOneText}>{props.classification}</Text>
          <View style={styles.break}/>
          <Image source={props.category==='Buyer'?IC_BUYER:IC_SELLER} resizeMode={'contain'} style={styles.iconTwo}/>
          <Text style={styles.categoryText}>{props.category}</Text>
        </View>
        <Text style={styles.date}>{props.date}</Text>
      </View>
    </View>
  
  )
}
const styles = StyleSheet.create({
card:{ backgroundColor:'#fff',marginHorizontal:20,marginVertical:5,paddingVertical:15,borderRadius:5},
  cardFirstLine:{ marginVertical:15,justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginHorizontal: 20,alignItems:'center' },
  leadId:{color:'#bebebe'},
  name:{ fontSize: 20, fontWeight: 'bold'},
  status:{ backgroundColor: '#e2fbff',padding:10 ,borderRadius:20,alignItems:'center'},
  statusText:{ color: '#288dbc' },
  allIconsAndDate:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 },
  allIcons:{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  iconOne:{ height: 20, width: 20 ,marginEnd:5},
  iconOneText:{color:'#6c6c6c',marginEnd:5},
  break:{ height: 15, borderWidth: 0.5 ,color:'#6c6c6c',marginLeft:5,marginRight:10},
  iconTwo:{ height: 20, width: 20,marginEnd:5 },
  categoryText:{color:"#6c6c6c"},
  date:{color:'#848c98',fontSize:12}
  
  
  
  
  
  
  
  
})

