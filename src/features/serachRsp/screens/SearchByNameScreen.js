import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getRSPAvailableHours } from '../slices/searchRSPSlice';

import Spacer from '../../../components/utils/Spacer';
import SearchRSPForm from '../components/SearchRSPForm';
import { SearchType } from '../../../infrastructure/utils/constants';
import {
  SearchContainer,
  ScrollBackground,
  Title,
  SafeScrollView,
} from '../components/SearchStyles.js';

export default function SearchByNameScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  const performSearch = (searchInput) => {
    dispatch(getRSPAvailableHours({ ...searchInput, ...route.params }));
  };

  return (
    <ScrollBackground>
      {/* <SearchCover /> */}
      <SafeScrollView>
        <Spacer size='large' />
        <SearchContainer>
          <SearchRSPForm
            searchType={SearchType.NAME}
            handleSearch={performSearch}
          />
        </SearchContainer>
      </SafeScrollView>
    </ScrollBackground>
  );
}
