import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchType } from '../../../infrastructure/utils/constants';
import RSPInfoCard from './RSPInfoCard';

import Spacer from '../../../components/utils/Spacer';
import FadeInView from '../../../components/animations/FadeInView';
import { SearchResultFlatList } from '../styles/searchResultStyles';

export default function SearchResultList({
  refreshing,
  handleRefresh,
  searchInput,
}) {
  const { loading, error, results } = useSelector((state) => state.searchRSP);
  const navigation = useNavigation();

  return (
    <SearchResultFlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          // onRefresh={handleRefresh(searchInput.searchType)}
        />
      }
      data={results}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RspDetails', {
              rsp: item,
              searchInput: searchInput,
            })
          }
        >
          <Spacer position='bottom'>
            <FadeInView>
              <RSPInfoCard
                rsp={item}
                isFullDisplay={false}
                searchInput={searchInput}
              />
            </FadeInView>
          </Spacer>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.rspId}
    />
  );
}
