import React from 'react'

const initialValues = {
  data: [],
  maxPage: null,
  currentPage:null,
  nextPage:null,
}
const LeadsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'SET_LEADS':
      return {
        state,
        data: action.payload.data,
        maxPage: action.payload.maxPage,
        currentPage: action.payload.currentPage,
        nextPage: action.payload.nextPage
      }
    default:
      return state
  }
}
export default LeadsReducer

