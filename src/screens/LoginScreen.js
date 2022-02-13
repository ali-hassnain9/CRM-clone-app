import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import InputField from '../dynamicFields/InputField'
import { Formik } from 'formik'
import CheckBox from '@react-native-community/checkbox'
import { IC_HIDE_PASSWORD, IC_LOGO, IC_SHOW_PASSWORD } from '../../assets'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import {useDispatch} from 'react-redux';
import { Dashboard } from './Dashboard'
import { fetchLeads, loggedInUser } from '../redux/action/action'


export const LoginScreen = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const navigation = useNavigation()
  const dispatch = useDispatch();
  
  const networkRequest = async (values) => {
    const response = await axios.post('https://dev2.empgautos.com/auth/sign_in', values)
    if (response.status === 200) {
      dispatch(loggedInUser(response))
      const header = response.headers
      const leadsResponse = await axios.get('https://dev2.empgautos.com/api/crm/crm_leads',
        { headers: header }
    )
      console.log('leadsResponse',leadsResponse)
      dispatch(fetchLeads(leadsResponse.data))
      navigation.navigate('BottomTabs')
    }
  }
  
  return (
    <View style={styles.main}>
      <SafeAreaView>
        <Image source={IC_LOGO} style={styles.logo}
               resizeMode="contain"/>
        <Text style={styles.heading}>Login to carforce
        </Text>
        <Text
          style={styles.welcomeText}>
          Hi 👋 Welcome to carforce! <Text style={styles.spanText}>
          Happy CRM :)</Text></Text>
        <Formik initialValues={{ email: '', password: '', checkStatus: toggleCheckBox }}
                onSubmit={values => networkRequest(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) =>
            (
              <View>
                
                <InputField secureTestEntry={false}
                            placeHolder={''}
                            type="email"
                            name="Email Address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                />
                <InputField secureTestEntry={showPassword}
                            placeHolder={''}
                            type="password"
                            name="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                />
                <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                  <Image source={showPassword ? (IC_HIDE_PASSWORD) : (IC_SHOW_PASSWORD)} style={styles.showHide}/>
                </TouchableWithoutFeedback>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(!toggleCheckBox)}
                    style={styles.checkbox}
                    boxType="square"
                    onFillColor="#0e53e6"
                    tintColor="#0e53e6"
                    onCheckColor="#fff"
                  
                  
                  />
                  <Text style={styles.checkboxText}>Remember me</Text>
                </View>
                
                <TouchableOpacity onPress={handleSubmit}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </Formik>
        <Text style={styles.bottomText}>POWERED BY EMPG LABS</Text>
      </SafeAreaView>
    </View>
  
  )
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  logo: { height: 100, width: 200, marginHorizontal: 20, marginVertical: 10 },
  heading: { fontWeight: 'bold', marginHorizontal: 20, fontSize: 20 },
  welcomeText: { marginHorizontal: 20, marginTop: 5, marginBottom: 25, color: '#a0a0a0' },
  spanText: { color: '#0f53e6' },
  showHide: {
    height: 35,
    width: 35,
    position: 'absolute',
    top: 115,
    right: 20,
    tintColor: '#000'
  },
  checkbox: { marginLeft: 20, marginVertical: 20, },
  checkboxText: { fontSize: 12, marginHorizontal: 10 },
  button: {
    backgroundColor: '#0e53e6',
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 20,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: { color: '#fff' },
  bottomText:{color:'#a0a0a0', bottom:-120,position:'relative',alignSelf:'center'}
})
