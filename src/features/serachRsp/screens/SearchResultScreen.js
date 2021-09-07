import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList, RefreshControl } from 'react-native';
import { RSPInfoCard } from '../components/RSPInfoCard';
import {
  SafeArea,
  RSPListContainer,
  AuthButton,
} from '../components/SearchStyles';
import { Spacer } from '../../../components/utils/Spacer';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { getRSPAvailableHours } from '../slices/searchRSPSlice';
import { getAvailableRSPs } from '../slices/searchRSPSlice';
import { colors } from '../../../infrastructure/theme/colors';

import NoResults from '../components/NoResults';
import {
  SearchResultContainer,
  SearchResultBackground,
  SearchResultCover,
  ErrorIconContainer,
  ErrorIcon,
  Title,
  RefreshScrollView,
} from '../styles/searchResultStyles';
import { AbortButton, BottomViewButton } from '../components/SearchStyles';

import { login, clearError } from '../slices/searchRSPSlice';
import { SearchType } from '../../../infrastructure/utils/constants';
import SearchResultList from '../components/SearchResultList';

export default function SearchResultScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { loading, error, results } = useSelector((state) => state.searchRSP);
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SearchResultContainer>
      <SearchResultBackground>
        <SearchResultCover>
          {!loading &&
            (error ? (
              <>
                <RefreshScrollView
                  refreshControl={<RefreshControl refreshing={refreshing} />}
                />
                <ErrorIconContainer>
                  <ErrorIcon icon='close' bg={colors.ui.error} />
                  <Title variant='body'>{error.message}</Title>
                </ErrorIconContainer>
                <BottomViewButton>
                  <AbortButton
                    mode='contained'
                    onPress={() => navigation.navigate('MainSearch')}
                  >
                    Try Again
                  </AbortButton>
                </BottomViewButton>
              </>
            ) : results.length === 0 ? (
              <NoResults refreshing={refreshing} />
            ) : (
              <SearchResultList
                refreshing={refreshing}
                searchInput={route.params}
              />
            ))}
        </SearchResultCover>
      </SearchResultBackground>
    </SearchResultContainer>
  );
}
