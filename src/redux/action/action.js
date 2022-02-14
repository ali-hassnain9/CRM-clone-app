export const loggedInUser = values => {
  return {
    type: 'LOGGED_IN_USER',
    payload: values,
  };
};

export const fetchLeads = data => {
  return {
    type: 'SET_LEADS',
    payload: data,
  };
};
