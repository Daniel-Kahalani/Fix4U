import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { RSPInfoCard } from '../components/RSPInfoCard';
import { SafeArea, RSPListContainer } from '../components/SearchStyles';
import { Spacer } from '../../../components/utils/Spacer';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { login, clearError } from '../slices/searchRSPSlice';
const RSPList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export default function SearchResultScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { error, results } = useSelector((state) => state.searchRSP);
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);
  const handlePress1 = () => {
    console.log('. result: ' + results);
    console.log('. faultType: ' + route.params.faultType);
    console.log('. date: ' + route.params.date);
  };
  return (
    <SafeArea>
      <View>
        <Button onPress={handlePress1} title='test' />
        {error && (
          <Text>
            {error.message} {error.code}
          </Text>
        )}
      </View>
      <RSPList
        data={[
          { name: 1 },
          { name: 2 },
          { name: 3 },
          { name: 4 },
          { name: 5 },
          { name: 6 },
        ]}
        renderItem={() => <RSPInfoCard />} //to do add wrapping spacer
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
}
