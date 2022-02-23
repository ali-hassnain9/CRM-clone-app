import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLeads} from '../redux/action/FetchLeadsAction';
import {leadsFilterStore} from '../redux/action/LeadsFilterStoreAction';
import axios from 'axios';
import {FlatList, RefreshControl, View} from 'react-native';
import {LeadCard} from './LeadCard';
import moment from 'moment';
import Skeleton from './Skeleton';
import FilterChips from './FilterChips';
import {GetFieldParams} from './getFieldParams';
import SelectedFilterChips from './selectedFilterChips';

const FlatLeads = props => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState(0);
  const dispatch = useDispatch();
  const header = useSelector(state => state.LoggedInUser.loggedInUser.headers);
  const Allleads = useSelector(state => state.LeadsReducer);
  const filtersObj = useSelector(state => state.LeadsFilterReducer);

  const onRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    dispatch(fetchLeads({data: [], maxPage: null}));
    const leadsResponse = await axios.get(
      `https://dev2.empgautos.com/api/crm/crm_leads?page=1`,
      {headers: header},
    );
    dispatch(
      fetchLeads({
        data: leadsResponse.data.crm_leads,
        maxPage: leadsResponse.data.pagination.total_pages,
        currentPage: leadsResponse.data.pagination.current_page,
        nextPage: leadsResponse.data.pagination.next_page,
      }),
    );
    dispatch(
      leadsFilterStore({
        assignee: [],
        lead_category: [],
        lead_client_email: '',
        lead_ref_id: '',
        lead_source: [],
        slugs: [],
      }),
    );

    setPagination(Allleads.currentPage + 1);
    setLoading(false);
    setRefreshing(false);
  });

  const paginationCheck = () => {
    if (pagination < Allleads.maxPage) {
      setPagination(Allleads.currentPage + 1);
    }
  };

  const fetch = async () => {
    try {
      if (Object.keys(filtersObj.state).length) {
        const values = await GetFieldParams(filtersObj.state);
        let leadsResponse = await axios.get(
          `https://dev2.empgautos.com/api/crm/crm_leads?page=${
            Allleads.currentPage + 1
          }` + values,
          {headers: header},
        );
        let arr = Allleads.data;
        let newArray = arr.concat(leadsResponse.data.crm_leads);
        dispatch(
          fetchLeads({
            data: newArray,
            maxPage: leadsResponse.data.pagination.total_pages,
            currentPage: leadsResponse.data.pagination.current_page,
            nextPage: leadsResponse.data.pagination.next_page,
          }),
        );
      } else {
        const leadsResponse = await axios.get(
          `https://dev2.empgautos.com/api/crm/crm_leads?page=${
            Allleads.currentPage + 1
          }`,
          {headers: header},
        );
        let arr = Allleads.data;
        let newArray = arr.concat(leadsResponse.data.crm_leads);
        dispatch(
          fetchLeads({
            data: newArray,
            maxPage: leadsResponse.data.pagination.total_pages,
            currentPage: leadsResponse.data.pagination.current_page,
            nextPage: leadsResponse.data.pagination.next_page,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
    setPagination(Allleads.nextPage);
  }, [pagination]);

  return (
    <View>
      <FilterChips />
      <View style={{marginHorizontal: 20}}>
        <SelectedFilterChips />
      </View>

      <FlatList
        data={props.data}
        onEndReached={paginationCheck}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <LeadCard
            leadID={item.id}
            name={item.client.name}
            classification={item.classification}
            category={item.category.name}
            status={item.status.name}
            date={moment(item.created_at).format('D MMM YYYY')}
            status={item.status.name}
          />
        )}
        refreshControl={
          <RefreshControl
            colors={'blue'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={true}
        ListFooterComponent={<Skeleton loading={loading} />}
      />
    </View>
  );
};

export default FlatLeads;
