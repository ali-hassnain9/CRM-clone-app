import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IC_DASHBOARD, IC_LEADS, IC_TASKS, IC_MORE, IC_INVENTORY } from '../../assets/index'
import {Dashboard} from '../screens/Dashboard'
import {Leads} from '../screens/Leads'
import {More} from '../screens/More'
import {Inventory} from '../screens/Inventory'
import {Tasks} from '../screens/Tasks'

const Tab = createBottomTabNavigator()

export const BottomTabs = () => {
  
  return (
    
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size }) => {
          let color = focused ? '#ba1f25' : 'gray';
          let source
          if (route.name === 'Dashboard') {
            source =  IC_DASHBOARD
          } if (route.name === 'Leads') {
              source =  IC_LEADS
            } else if (route.name === 'Tasks') {
              source =  IC_TASKS
            } else if (route.name === 'Inventory') {
              source = IC_INVENTORY
            } else if (route.name === 'More') {
              source =  IC_MORE
            }
            return (
              <View style={styles.tab}>
              <Image source={source} resizeMode="contain" style={[styles.tabIcons, { tintColor: focused?'#ba1f25':'gray', }]}/>
              <Text style={[styles.tabText,{color:focused?'#ba1f25':'gray'}]}>{route.name}</Text>
              </View>
            )
          
          
        }
      })}
    >
      < Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Leads"
        component={Leads}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  
  )
  
}

const styles = StyleSheet.create({
  tab:{
    marginVertical:0,
    marginHorizontal:0,
    alignItems:'center',
    marginLeft:10
    
  },
    tabIcons: {
      height: 25, width: 25
    },
  tabText:{
      fontSize:12,
    
  }
  }
)
