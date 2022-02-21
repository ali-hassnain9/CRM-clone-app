import React from 'react'

const initialValues = {
  state:{}
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
