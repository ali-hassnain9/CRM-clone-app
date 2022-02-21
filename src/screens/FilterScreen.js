import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FilterInputField from '../dynamicFields/FilterInputField'
import {
  IC_ASSIGNEE,
  IC_BACKARROW,
  IC_CALENDAR,
  IC_EMAIL,
  IC_LEADREFID,
  IC_LEADSOURCE,
  IC_LEADTYPE
} from '../../assets'
import SingleOrMultipleSelectionField from '../dynamicFields/singleOrMultipleSelectionField'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchLeads } from '../redux/action/FetchLeadsAction'
import { leadsFilterStore } from '../redux/action/LeadsFilterStoreAction'
import { useNavigation } from '@react-navigation/native'

export async function getFieldParams (allFilters) {
  let query = ''
  let categories = allFilters?.lead_category
  let categoryTypes = allFilters?.lead_type
  let assignees = allFilters?.assignee
  let leadSources = allFilters?.lead_source
  let refId = allFilters?.lead_ref_id
  let email = allFilters?.lead_client_email
  let slug = allFilters?.slugs
  
  if (refId !== '' && refId != null) {
    query = query + 'f[reference_number]=' + refId + '&'
  }
  if (email !== '' && email != null) {
    query = query + 'f[client.email]=' + email + '&'
  }
  if (slug && slug.length > 0) {
    slug.map((item) => {
      query = query + 'f[category.slug][]=' + item?.slug + '&'
    })
  }
  if (assignees && assignees.length > 0) {
    assignees.map((item) => {
      query = query + 'f[assignee.id][]=' + item.id + '&'
    })
    
  }
  if (leadSources && leadSources.length > 0) {
    leadSources.map((item) => {
      query = query + 'f[lead_source.id][]=' + item.id + '&'
    })
  }
  if (categoryTypes && categoryTypes.length > 0) {
    categoryTypes.map((item) => {
      query = query + 'f[category_type.id][]=' + item.id + '&'
    })
  }
  
  if (query !== '') {
    return '&' + query
  }
}

const FilterScreen = ({ navigation: { goBack } }) => {
  const [assignee, setAssignee] = useState([])
  const [needInputParams, setNeedInputParams] = useState('')
  const [needInputTwoParams, setNeedInputTwoParams] = useState('')
  const [needSelectedAssignee, setNeedSelectedAssignee] = useState([])
  const [needSelectedLeadSource, setNeedSelectedLeadSource] = useState([])
  const [needSelectedLeadType, setNeedSelectedLeadType] = useState([])
  const [needSelectedLeadCategory, setNeedSelectedLeadCategory] = useState([])
  
  const [leadSource, setLeadSource] = useState([])
  const [leadCategory, setLeadCategory] = useState([])
  
  const [leadCategoryType, setLeadCategoryType] = useState([])
  
  const filters = useSelector(state => state.LeadsFilterReducer)
  const header = useSelector(state => state.LoggedInUser.loggedInUser.headers)
  const dispatch = useDispatch()
  
  async function fetchAssigneeData () {
    const response = await axios.get(`https://dev2.empgautos.com/api/users`,
      { headers: header })
    const filterOne = response.data?.users
    setAssignee(filterOne)
    
    const response1 = await axios.get(`https://dev2.empgautos.com/api/crm/crm_leads`,
      { headers: header })
    const filterFour = response1.data?.categories
    setLeadCategoryType(filterFour)
    
    const response2 = await axios.get(`https://dev2.empgautos.com/api/lead_sources`,
      { headers: header })
    const filterTwo = response2.data?.lead_sources
    setLeadSource(filterTwo)
    
    const response3 = await axios.get(`https://dev2.empgautos.com/api/crm/category_types`,
      { headers: header })
    const filterThree = response3.data?.category_types
    setLeadCategory(filterThree)
  }
  
  const navigation = useNavigation()
  useEffect(() => {
    fetchAssigneeData()
    
  }, [])
  
  useEffect(() => {
      if (Object.keys(filters.state).length) {
        setNeedInputParams(filters.state?.lead_ref_id)
        setNeedInputTwoParams(filters.state?.lead_client_email)
        setNeedSelectedAssignee(filters.state?.assignee)
        setNeedSelectedLeadType(filters.state?.slugs)
        setNeedSelectedLeadCategory(filters.state?.lead_category)
        setNeedSelectedLeadSource(filters.state?.lead_source)
      }
    },
    [])
  
  //callback function not used but saving it for the future
  // const getAllFilters = (params) => {
  //   setAllFilters((prevState) => ({ ...prevState, ...params }))
  // }
  
  async function filterButtonHandler () {
    let obj = {
      lead_ref_id: needInputParams,
      lead_client_email: needInputTwoParams,
      assignee: needSelectedAssignee,
      lead_source: needSelectedLeadSource,
      slugs: needSelectedLeadType,
      lead_category: needSelectedLeadCategory,
    }
    const values = await getFieldParams(obj)
    
    const response = await axios.get('https://dev2.empgautos.com/api/crm/crm_leads?page=1' + values, {
      headers: header
    })
    dispatch(fetchLeads({ data: [] }))
    dispatch(leadsFilterStore(obj))
    dispatch(fetchLeads({
      data: response.data?.crm_leads,
      maxPage: response.data?.pagination.total_pages,
      currentPage: response.data?.pagination.current_page,
      nextPage: response.data?.pagination.next_page
    }))
    navigation.goBack()
  }
  
  return (
    <View style={styles.main}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.boxShadowParent}>
            <View style={styles.boxShadow}>
              <View style={styles.top}>
                <TouchableWithoutFeedback onPress={() => goBack()}>
                  <Image source={IC_BACKARROW} resizeMode="contain" style={{ height: 15, width: 15, marginEnd: 10 }}/>
                </TouchableWithoutFeedback>
                
                <Text style={styles.title}>Lead Filters</Text>
              </View>
            </View>
          </View>
          <FilterInputField needInputParams={needInputParams} setNeedInputParams={(text) => setNeedInputParams(text)}
                            placeHolder="Enter Lead Ref Id"
                            name="Lead Ref Id" logo={IC_LEADREFID}/>
          <FilterInputField needInputTwoParams={needInputTwoParams}
                            setNeedInputTwoParams={(text) => setNeedInputTwoParams(text)}
                            placeHolder="Enter Lead Client email"
                            field={'lead_client_email'} name="Lead Client Email" logo={IC_EMAIL} type={'email'}/>
          <SingleOrMultipleSelectionField
            selected={needSelectedAssignee}
            onSelect={(selected) => {
              setNeedSelectedAssignee([selected])
            }}
            logo={IC_ASSIGNEE}
            dataType={'name'}
            type={'single_select'}
            name={'Assignee'}
            isSingleSelect={true}
            data={assignee}
          />
          <SingleOrMultipleSelectionField
            logo={IC_LEADSOURCE}
            dataType={'name'}
            type={'multi_select'}
            field={'lead_source'}
            name={'Lead Source'}
            isSingleSelect={false}
            selected={needSelectedLeadSource}
            onSelect={(selectedItem) => {
              const filtered = needSelectedLeadSource?.some((leadSourceItem) => leadSourceItem.id === selectedItem.id)
              if (filtered) {
                let filteredData = needSelectedLeadSource?.filter((data) => data.id !== selectedItem.id)
                setNeedSelectedLeadSource(filteredData)
              } else {
                setNeedSelectedLeadSource((needSelectedLeadSource) => [...needSelectedLeadSource, selectedItem])
              }
            }
            }
            data={leadSource}
          
          />
          <SingleOrMultipleSelectionField
            logo={IC_CALENDAR}
            key={'13'}
            type={'multi_select'}
            name={'Created At'}
            field={'created_at'}
            isSingleSelect={false}
            data={['calendar', 'is', 'not', 'required', 'for', 'this', 'project']}
          />
          <SingleOrMultipleSelectionField
            logo={IC_LEADTYPE}
            dataType={'name'}
            key={'14'}
            type={'multi_select'}
            name={'Lead Type'}
            field={'slugs'}
            isSingleSelect={false}
            selected={needSelectedLeadType}
            onSelect={(selectedItem) => {
              const filtered = needSelectedLeadType?.some((leadSourceItem) => leadSourceItem.id === selectedItem.id)
              if (filtered) {
                let filteredData = needSelectedLeadType?.filter((data) => data.id !== selectedItem.id)
                setNeedSelectedLeadType(filteredData)
              } else {
                setNeedSelectedLeadType((needSelectedLeadType) => [...needSelectedLeadType, selectedItem])
              }
            }
            }
            data={leadCategoryType}
          />
          <SingleOrMultipleSelectionField
            logo={IC_LEADREFID}
            dataType={'name'}
            key={'15'}
            type={'multi_select'}
            name={'Lead Category'}
            selected={needSelectedLeadCategory}
            onSelect={(selectedItem) => {
              const filtered = needSelectedLeadCategory?.some((leadSourceItem) => leadSourceItem.id === selectedItem.id)
              if (filtered) {
                let filteredData = needSelectedLeadCategory?.filter((data) => data.id !== selectedItem.id)
                setNeedSelectedLeadCategory(filteredData)
              } else {
                setNeedSelectedLeadCategory((needSelectedLeadCategory) => [...needSelectedLeadCategory, selectedItem])
              }
            }}
            field={'lead_category'}
            isSingleSelect={false}
            data={leadCategory}
          />
          <View style={styles.buttonsParent}>
            
            <TouchableWithoutFeedback>
              <View style={styles.cancel}>
                <Text>Cancel</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => filterButtonHandler()}>
              <View style={styles.applyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  
  )
}
export default FilterScreen
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1
  },
  boxShadowParent: {
    overflow: 'hidden',
    paddingBottom: 5
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 60
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonsParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancel: {
    backgroundColor: '#fff',
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  applyFilters: {
    backgroundColor: '#ba1f24',
    marginTop: 10,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  applyButtonText: {
    color: 'white'
  }
  
})
