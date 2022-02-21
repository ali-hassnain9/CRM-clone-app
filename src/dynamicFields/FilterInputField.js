import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

function FilterInputField (props) {
  const [input, setInput] = useState("")
  
  useEffect(() => {
    input && props.getAllFilters({ [props.field]: input })
  }, [input])
  
  return (
    <View style={styles.inputCard}>
      <View style={styles.logoCover}>
        <Image source={props.logo} resizeMode={'contain'} style={styles.logo}/>
      </View>
      <View style={styles.inputAndTitle}>
        <Text style={styles.title}>{props.name}</Text>
        <TextInput
          onChangeText={props.setNeedInputParams||props.setNeedInputTwoParams}
          value={props.needInputParams||props.needInputTwoParams}
          secureTextEntry={props.secureTestEntry}
          placeholder={props.placeHolder}
          onBlur={props.onBlur}
          style={styles.input}
          type={props.type}
        />
      </View>
    
    </View>
  )
}

export default FilterInputField
const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    color: '#060606',
    marginBottom: 5
  },
  inputCard: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  logoCover: {
    backgroundColor: '#fafafc',
    borderRadius: 20,
    padding: 8,
    marginLeft: 15,
    marginRight: 8
  },
  logo: {
    height: 15,
    width: 15
  },
  inputAndTitle: {
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    width: '75%',
    alignSelf: 'center',
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    fontSize: 14,
    color: '#939393',
    
  }
})
