import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { TabBar, TabBarIndicator, TabView } from 'react-native-tab-view'
import FlatLeads from '../components/Flatleads'

export const Leads = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Seller' },
    { key: 'third', title: 'Buyer' },
  ])
  
  const leads = useSelector(state => state.LeadsReducer?.data)
  const buyerLeads = leads?.filter((item) => item.category.name === 'Buyer')
  const sellerLeads = leads?.filter((item) => item.category.name === 'Seller')
  
  const All = <FlatLeads data={leads}/>
  
  const Seller = <FlatLeads data={sellerLeads}/>
  
  const Buyer = <FlatLeads data={buyerLeads}/>
  
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return All
      case 'second':
        return Seller
      case 'third':
        return Buyer
      default:
        return All
    }
  }
  const renderIndicator = (props) => <TabBarIndicator {...props} style={styles.tabBarIndicatorStyle}/>
  const renderTabBar = props => (
    <ScrollView
      horizontal={true}
      nestedScrollEnabled={true}
      style={styles.scrollView}
      showsHorizontalScrollIndicator={true}
      scrollEventThrottle={200}
      bounces={false}
    >
      <TabBar
        {...props}
        renderIndicator={renderIndicator}
        style={[styles.tabBarStyle, { backgroundColor: '#f2f2f2' }]}
        tabStyle={styles.tabBarTabStyle}
        labelStyle={[styles.tabBarLabelStyle, { left: 0, paddingLeft: 20 }]}
        activeColor={'#000'}
        inactiveColor={'#899196'}
      />
    </ScrollView>
  )
  
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.title}>All Leads</Text>
      
      <TabView
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20
  },
  tabBarStyle: {
    elevation: 0,
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#000',
    height: 3,
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    left: 20,
  },
  tabBarTabStyle: {
    width: 'auto',
    padding: 0,
    marginRight: 40,
  },
  scrollView: {
    flexGrow: 0,
    marginBottom: 5,
    backgroundColor: '#f2f2f2',
    borderBottomColor: '#e5e4e4',
    borderBottomWidth: 0.5,
    width: '90%',
    marginHorizontal: 20
  }
  
})
