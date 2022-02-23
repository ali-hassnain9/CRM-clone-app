import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IC_CLOSE} from '../../assets';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLeads} from '../redux/action/FetchLeadsAction';
import {leadsFilterStore} from '../redux/action/LeadsFilterStoreAction';
import {GetFieldParams} from './getFieldParams';
import axios from 'axios';

function SelectedFilterChips() {
  const filtersObj = useSelector(state => state.LeadsFilterReducer.state);
  const dispatch = useDispatch();
  const header = useSelector(state => state.LoggedInUser.loggedInUser.headers);
  const filterOptions = item => {
    let arr = [];
    Object.keys(item).map(parentItem => {
      let selectedValues;
      if (parentItem === 'lead_ref_id') {
        selectedValues = {
          id: Math.random(),
          name: item[parentItem],
          slugs: item[parentItem],
          type: parentItem,
        };
        if (selectedValues.name.length > 0) {
          item !== null && arr.push(selectedValues);
        }
      } else if (parentItem === 'lead_client_email') {
        selectedValues = {
          id: Math.random(),
          name: item[parentItem],
          slugs: item[parentItem],
          type: parentItem,
        };
        if (selectedValues.name.length > 0) {
          item !== null && arr.push(selectedValues);
        }
      } else {
        item[parentItem]?.map(elem => {
          selectedValues = {
            id: elem.id,
            type: parentItem,
            name: elem.name,
            slugs: elem.slugs,
          };
          arr.push(selectedValues);
        });
      }
    });
    return arr;
  };

  async function deleteSingleItem(item) {
    let tempFilters = filtersObj;
    tempFilters[item.type] = '';
    dispatch(leadsFilterStore(tempFilters));
    const values = await GetFieldParams(tempFilters);
    const response = await axios.get(
      'https://dev2.empgautos.com/api/crm/crm_leads?page=1' + values,
      {
        headers: header,
      },
    );
    dispatch(
      fetchLeads({
        data: response.data?.crm_leads,
        maxPage: response.data?.pagination.total_pages,
        currentPage: response.data?.pagination.current_page,
        nextPage: response.data?.pagination.next_page,
      }),
    );
  }

  async function deleteArrayItem(item) {
    let tempFilters = filtersObj;
    let filters = tempFilters[item.type].filter(xyz => xyz.name !== item.name);
    tempFilters[item.type] = filters;
    dispatch(leadsFilterStore(tempFilters));
    const values = await GetFieldParams(tempFilters);
    const response = await axios.get(
      'https://dev2.empgautos.com/api/crm/crm_leads?page=1' + values,
      {
        headers: header,
      },
    );
    dispatch(
      fetchLeads({
        data: response.data?.crm_leads,
        maxPage: response.data?.pagination.total_pages,
        currentPage: response.data?.pagination.current_page,
        nextPage: response.data?.pagination.next_page,
      }),
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={filterOptions(filtersObj)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (
                  item.type === 'lead_ref_id' ||
                  item.type === 'lead_client_email'
                ) {
                  deleteSingleItem(item);
                } else {
                  deleteArrayItem(item);
                }
              }}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{item.name}</Text>
                <Image
                  source={IC_CLOSE}
                  resizeMode={'contain'}
                  style={styles.filterIcon}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default SelectedFilterChips;
const styles = StyleSheet.create({
  chip: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    backgroundColor: '#f0f8ff',
    height: 38,
    width: 110,
    marginRight: 5,
  },
  filterIcon: {
    height: 8,
    width: 8,
    marginEnd: 5,
    tintColor: '#7bbaf1',
  },
  chipText: {
    fontSize: 13,
    marginEnd: 3,
    color: '#7bbaf1',
  },
});
