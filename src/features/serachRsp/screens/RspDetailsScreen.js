import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import RSPInfoCard from '../components/RSPInfoCard';
import {
  RspDetailsContainer,
  RspDetailsBackground,
  RspDetailsCover,
} from '../styles/RspDetailsStyles';

export default function RspDetailsScreen({ route }) {
  const { rsp, searchInput } = route.params;

  // const { searchDetails } = route.params;

  return (
    <RspDetailsBackground>
      <RspDetailsCover>
        <ScrollView>
          <RspDetailsContainer>
            <RSPInfoCard
              rsp={rsp}
              isFullDisplay={true}
              searchInput={searchInput}
            />
          </RspDetailsContainer>
        </ScrollView>
      </RspDetailsCover>
    </RspDetailsBackground>
  );
}
