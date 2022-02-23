import React from 'react'

const initialValues = {
  state:{
    assignee: [],
    lead_category: [],
    lead_client_email: "",
    lead_ref_id: "",
    lead_source: [],
    slugs: [],
  }
}
const LeadsFilterReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'SET_LEADS_FILTER':
      return {...state,state:action.payload}
    default:
      return state
  }
}
export default LeadsFilterReducer
