import React,{useState} from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { LeadCard } from '../components/LeadCard'
import moment from 'moment';
import { TabView, SceneMap } from 'react-native-tab-view';

const AllRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SellerRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const BuyerRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: AllRoute,
  second: SellerRoute,
  third: BuyerRoute
});

export const Leads = () => {
  // const [routes,setRoutes] = useState([
  //   { key: 'first', title: 'AllRoute' },
  //   { key: 'second', title: 'SellerRoute' },
  //   { key: 'third', title: 'BuyerRoute' },
  // ]);
  
  const navigation = useNavigation();
  const leads = useSelector(state => state.LeadsReducer.data.crm_leads)
  console.log(leads)

  return(
    <SafeAreaView style={styles.main}>
      {/*<TabView*/}
      {/*  navigationState={{ index, routes }}*/}
      {/*  renderScene={renderScene}*/}
      {/*  onIndexChange={setIndex}*/}
      {/*  initialLayout={{ width: layout.width }}*/}
      {/*/>*/}
      <View>
        <FlatList
          data={leads}
          renderItem={({ item }) => (
            <LeadCard
              leadID={item.id}
              name={item.client.name}
              classification={item.classification}
              category={item.category.name}
              status={item.status.name}
              date={moment(item.created_at).format("D MMM YYYY")}
              status={item.status.name}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
main:{
  backgroundColor:'#f2f2f2'
}

});

