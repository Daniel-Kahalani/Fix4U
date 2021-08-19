import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { RSPInfoCard } from '../components/RSPInfoCard';
import { SafeArea, RSPListContainer } from '../components/SearchStyles';
import { Spacer } from '../../../components/utils/Spacer';
import styled from 'styled-components/native';

const RSPList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export default function SearchResultScreen({ navigation }) {
  return (
    <SafeArea>
      <RSPList
        data={[
          { name: 1 },
          { name: 2 },
          { name: 3 },
          { name: 4 },
          { name: 5 },
          { name: 6 },
          { name: 7 },
          { name: 8 },
          { name: 9 },
          { name: 10 },
          { name: 11 },
          { name: 12 },
          { name: 13 },
          { name: 14 },
        ]}
        renderItem={() => <RSPInfoCard />} //to do add wrapping spacer
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
}
