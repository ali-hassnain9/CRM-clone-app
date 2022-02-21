import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IC_DOWNARROW, IC_FILTER } from '../../assets'
import { useNavigation } from '@react-navigation/native'

const FilterChips = () => {
  const navigation = useNavigation()
  return (
   
      <View style={styles.allChips}>
        <TouchableOpacity style={[styles.chip, { marginEnd: 5 }]} onPress={()=>navigation.navigate('FilterScreen')}>
          <Image source={IC_FILTER} resizeMode={'contain'} style={[styles.filterIcon, { height: 18, width: 18 }]}/>
          <Text style={styles.chipText}>Filters</Text>
          <Image source={IC_DOWNARROW} resizeMode={'contain'} style={styles.filterIcon}/>
        </TouchableOpacity>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={[styles.chip, { marginEnd: 5 }]}>
          <Text style={styles.chipText}>Assignee</Text>
          <Image source={IC_DOWNARROW} resizeMode={'contain'} style={styles.filterIcon}/>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Lead Type</Text>
          <Image source={IC_DOWNARROW} resizeMode={'contain'} style={styles.filterIcon}/>
        </View>
        </ScrollView>
      </View>

  )
}
export default FilterChips
const styles = StyleSheet.create({
  allChips: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  chip: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
    height: 38,
    width: 110
  },
  filterIcon: {
    height: 10,
    width: 10,
    marginEnd: 5,
    tintColor: 'black'
  },
  chipText: {
    fontSize: 12,
    marginEnd: 3
  }
})
