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
  const { results } = useSelector((state) => state.searchRSP);
  const { rsp } = route.params;

  // const { searchDetails } = route.params;

  console.log('//////////////////////////////////// results ' + results);
  console.log('//////////////////////////////////// rsp ' + rsp);

  return (
    <RspDetailsBackground>
      <RspDetailsCover>
        <ScrollView>
          <RspDetailsContainer>
            <RSPInfoCard rsp={rsp} isFullDisplay={true} />
          </RspDetailsContainer>
        </ScrollView>
      </RspDetailsCover>
    </RspDetailsBackground>
  );
}
