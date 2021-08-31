import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAvailableRSPs } from '../slices/searchRSPSlice';
import Spacer from '../../../components/utils/Spacer';
import { expertiseArr } from '../../../infrastructure/utils/constants';
import SearchRSPForm from '../components/SearchRSPForm';
import { SearchType } from '../../../infrastructure/utils/constants';

import {
  SearchContainer,
  ScrollBackground,
  Title,
} from '../components/SearchStyles.js';

export default function SearchByNameScreen({ route, navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  // const clearInput = () => {
  //   setDateChoosen('');
  //   setStartTimeChoosen('');
  //   setEndTimeChoosen('');
  //   setAppointmentType(appointmentTypePlaceholder);
  //   setTitle('');
  //   setDescription('');
  //   setErrorCheck(false);
  // };

  const performSearch = async (searchInput) => {
    const resultAction = await dispatch(
      getAvailableRSPs({ ...searchInput, ...route.params })
    );
    if (getAvailableRSPs.fulfilled.match(resultAction)) {
      navigation.navigate('SearchResult', searchInput);
    }
  };

  return (
    <ScrollBackground>
      {/* <SearchCover /> */}
      <Title>Search By Availability</Title>
      <Spacer size='large' />
      <SearchContainer>
        <SearchRSPForm
          searchType={SearchType.Location}
          handleSearch={performSearch}
        />
      </SearchContainer>
    </ScrollBackground>
  );
}
