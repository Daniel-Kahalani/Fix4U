import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList, RefreshControl } from 'react-native';
import { RSPInfoCard } from '../components/RSPInfoCard';
import { SafeArea, RSPListContainer } from '../components/SearchStyles';
import { Spacer } from '../../../components/utils/Spacer';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { getRSPAvailableHours } from '../slices/searchRSPSlice';
import { getAvailableRSPs } from '../slices/searchRSPSlice';
import { colors } from '../../../infrastructure/theme/colors';

import NoResults from '../components/NoResults';
// import PastAppointmentsList from '../components/PastAppointmentsList';
import {
  SearchResultContainer,
  SearchResultBackground,
  SearchResultCover,
  ErrorIconContainer,
  ErrorIcon,
  Title,
  RefreshScrollView,
} from '../styles/searchResultStyles';

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

  // const onRefresh = React.useCallback(async () => {
  //   setRefreshing(true);
  //   if (route.params.searchType === SearchType.LOCATION) {
  //     console.log('in onRefresh SearchType === SearchType.LOCATION ');
  //     await dispatch(getAvailableRSPs());
  //   } else {
  //     console.log('in onRefresh SearchType === SearchType.NAME ');
  //     await dispatch(getRSPAvailableHours());
  //   }
  //   setRefreshing(false);
  // }, [dispatch]);

  const handlePress1 = () => {
    console.log('. result: ' + results);
    console.log('. faultType: ' + route.params.faultType);
    console.log('. date: ' + route.params.date);
  };
  return (
    <SearchResultContainer>
      {/* <View>
        <Button onPress={handlePress1} title='test' />
        {error && (
          <Text>
            {error.message} {error.code}
          </Text>
        )}
      </View> */}
      <SearchResultBackground>
        <SearchResultCover>
          {!loading &&
            (error ? (
              <>
                <RefreshScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      // onRefresh={onRefresh}
                    />
                  }
                />
                <ErrorIconContainer>
                  <ErrorIcon icon='close' bg={colors.ui.error} />
                  <Title variant='body'>{error.message}</Title>
                </ErrorIconContainer>
              </>
            ) : results.length === 0 ? (
              <></> // <NoResults refreshing={refreshing} handelRefresh={onRefresh} />
            ) : (
              <SearchResultList
                refreshing={refreshing}
                // handleRefresh={onRefresh}
              />
            ))}
        </SearchResultCover>
      </SearchResultBackground>
    </SearchResultContainer>
  );
}
