import React from 'react';
import {TextInput, View,Text} from 'react-native';

function InputField(props) {
  // console.log(props)
  return (
    <View style={{borderRadius: 5,borderColor: '#dbdbdb', borderWidth: 1,width:'90%',marginHorizontal:20,marginVertical:10}}>
      <Text style={{fontSize:16,position:'absolute',top:-10,left:20,color:'#dbdbdb',backgroundColor:'#fff',paddingHorizontal:5}}>{props.name}</Text>
      <TextInput
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTestEntry}
        placeholder={props.placeHolder}
        onBlur={props.onBlur}
        style={{
          height:55,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor:'white',
          width:'90%',
          justifyContent:'center',
          paddingLeft:0,
          marginVertical:5,
          marginHorizontal:20,
          fontSize:20,
          color:'#000'
        }}
      />
    </View>
  );
}

export default InputField;
