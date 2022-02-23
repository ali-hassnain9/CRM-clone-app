import React from 'react';
import axios from 'axios';

export const FetchData = async (headers, setData) => {
  try {
    const baseURL = `https://dev2.empgautos.com/api`;
    const response1 = await axios.get(`${baseURL}/users`, {headers});
    const filterOne = response1.data?.users;
    const response2 = await axios.get(`${baseURL}/crm/crm_leads`, {headers});
    const filterTwo = response2.data?.categories;
    const response3 = await axios.get(`${baseURL}/lead_sources`, {headers});
    const filterThree = response3.data?.lead_sources;
    const response4 = await axios.get(`${baseURL}/crm/category_types`, {
      headers,
    });
    const filterFour = response4.data?.category_types;

    setData({
      assignee: filterOne,
      lead_sources: filterThree,
      categories: filterTwo,
      category_types: filterFour,
    });
  } catch (error) {
    console.log('error', error);
  }
};
