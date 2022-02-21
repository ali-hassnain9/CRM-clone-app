import React from 'react'
import { TextInput, View, Text,StyleSheet } from 'react-native'

function InputField (props) {
  return (
    <View style={styles.border}>
      <Text style={styles.title}>{props.name}</Text>
      <TextInput
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTestEntry}
        placeholder={props.placeHolder}
        onBlur={props.onBlur}
        style={styles.input}
      />
    </View>
  )
}

export default InputField
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    position: 'absolute',
    top: -10,
    left: 20,
    color: '#dbdbdb',
    backgroundColor: '#fff',
    paddingHorizontal: 5
  },
  border: {
    borderRadius: 5,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 10
  },
  input: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
    paddingLeft: 0,
    marginVertical: 5,
    marginHorizontal: 20,
    fontSize: 20,
    color: '#000'
  }
})
