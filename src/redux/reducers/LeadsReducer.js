import React from 'react';
const LeadsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEADS':
      return {...state, data: action.payload};
    default:
      return state;
  }
};
export default LeadsReducer;
