import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IC_ASSIGNEE,
  IC_DOWNARROW,
  IC_FILTER,
  IC_LEADSOURCE,
  IC_LEADTYPE,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {GetFieldParams} from './getFieldParams';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {fetchLeads} from '../redux/action/FetchLeadsAction';
import {leadsFilterStore} from '../redux/action/LeadsFilterStoreAction';
import ChipFilter from './ChipFilter';
import {FetchData} from './FetchFiltersData';

const FilterChips = () => {
  const [needSelectedAssignee, setNeedSelectedAssignee] = useState([]);
  const [needSelectedLeadSource, setNeedSelectedLeadSource] = useState([]);
  const [needSelectedLeadType, setNeedSelectedLeadType] = useState([]);
  const [data, setData] = useState({
    assignee: [],
    lead_sources: [],
    category_types: [],
  });

  const header = useSelector(state => state.LoggedInUser.loggedInUser.headers);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const filters = useSelector(state => state.LeadsFilterReducer);
  useEffect(() => {
    FetchData(header, setData);
  }, []);
  useEffect(() => {
    setNeedSelectedAssignee(filters.state.assignee);
    setNeedSelectedLeadSource(filters.state.lead_source);
    setNeedSelectedLeadType(filters.state.slugs);
  }, [filters.state]);

  useEffect(() => {
    filterHandler();
  }, [needSelectedAssignee, needSelectedLeadSource, needSelectedLeadType]);
  useEffect(() => {
    setNeedSelectedAssignee(filters.state.assignee);
    setNeedSelectedLeadSource(filters.state.lead_source);
    setNeedSelectedLeadType(filters.state.slugs);
  }, [filters]);
  async function filterHandler() {
    let filter = filters.state;
    filter['assignee'] = needSelectedAssignee;
    filter['slugs'] = needSelectedLeadType;
    filter['lead_source'] = needSelectedLeadSource;
    const values = await GetFieldParams(filter);
    const response = await axios.get(
      'https://dev2.empgautos.com/api/crm/crm_leads?page=1' + values,
      {
        headers: header,
      },
    );
    dispatch(leadsFilterStore(filter));

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
    <View style={styles.allChips}>
      <TouchableOpacity
        style={[styles.chip, {marginEnd: 5}]}
        onPress={() => navigation.navigate('FilterScreen')}>
        <Image
          source={IC_FILTER}
          resizeMode={'contain'}
          style={[styles.filterIcon, {height: 18, width: 18}]}
        />
        <Text style={styles.chipText}>Filters</Text>
        <Image
          source={IC_DOWNARROW}
          resizeMode={'contain'}
          style={styles.filterIcon}
        />
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <ChipFilter
          selected={needSelectedAssignee}
          onSelect={item => {
            setNeedSelectedAssignee([item]);
          }}
          logo={IC_ASSIGNEE}
          dataType={'name'}
          type={'single_select'}
          name={'Assignee'}
          isSingleSelect={true}
          data={data.assignee}
          selected={needSelectedAssignee}
          onSelected={setNeedSelectedAssignee}
        />
        <ChipFilter
          logo={IC_LEADSOURCE}
          dataType={'name'}
          type={'multi_select'}
          field={'lead_source'}
          name={'Lead Source'}
          isSingleSelect={false}
          selected={needSelectedLeadSource}
          onSelected={setNeedSelectedLeadSource}
          data={data.lead_sources}
        />
        <ChipFilter
          logo={IC_LEADTYPE}
          dataType={'name'}
          key={'14'}
          type={'multi_select'}
          name={'Lead Type'}
          field={'slugs'}
          isSingleSelect={false}
          selected={needSelectedLeadType}
          onSelected={setNeedSelectedLeadType}
          data={data.categories}
        />
      </ScrollView>
    </View>
  );
};
export default FilterChips;
const styles = StyleSheet.create({
  allChips: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
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
    width: 110,
  },
  filterIcon: {
    height: 10,
    width: 10,
    marginEnd: 5,
    tintColor: 'black',
  },
  chipText: {
    fontSize: 12,
    marginEnd: 3,
  },
});
