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

export default function SearchResultList({ refreshing, handleRefresh }) {
  const { loading, error, results } = useSelector((state) => state.searchRSP);
  const navigation = useNavigation();

  const handlePress1 = (item) => {
    console.log('. result: ' + results);
    console.log('. result[0]: ' + results[0]);
    console.log('. item.businessName: ' + item.businessName);
    console.log('. item.rspId: ' + item.rspId);
    console.log('. item.location: ' + item.location);
  };
  return (
    <SearchResultFlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      data={results}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RspDetails', {
              rsp: item,
            })
          }
        >
          <Spacer position='bottom'>
            <FadeInView>
              <RSPInfoCard rsp={item} isFullDisplay={false} />
            </FadeInView>
          </Spacer>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.rspId}
    />
  );
}
