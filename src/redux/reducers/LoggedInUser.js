import React from 'react';

const initialValues = {
  loggedInUser: {},
};

const LoggedInUser = (state = initialValues, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return {loggedInUser: {...state.loggedInUser, ...action.payload}};
    default:
      return state;
  }
};
export default LoggedInUser;
