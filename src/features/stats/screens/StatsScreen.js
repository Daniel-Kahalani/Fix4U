import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChartStats } from '../slices/statsSlices';
import { ScrollView, RefreshControl } from 'react-native';
import Grade from '../components/Grade';
import Charts from '../components/Charts';
import {
  ScrollBackground,
  StatsCover,
  RefreshMiniScrollView,
  ErrorContainer,
  ErorIcon,
  ErrorTitle,
  StatsContainer,
  ChartsContainer,
  Title,
} from '../styles/statsStyles';

export default function StatsScreen() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.stats);
  const { info } = useSelector((state) => state.user);
  const [numOfMonths, setNumOfMonths] = useState(3);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getChartStats(numOfMonths));
    setRefreshing(false);
  };

  return (
    <ScrollBackground>
      <StatsCover>
        {!loading &&
          (error || !info || !info.rating ? (
            <>
              <RefreshMiniScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
              <ErrorContainer>
                <ErorIcon icon='close' />
                <ErrorTitle variant='body'>
                  {error
                    ? error.message
                    : 'Unable to show your statistics,\n please try to refresh'}
                </ErrorTitle>
              </ErrorContainer>
            </>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <StatsContainer>
                <ChartsContainer>
                  <Title varient='label'>Your Score</Title>
                  <Grade grade={info.rating} />
                  <Charts
                    numOfMonths={numOfMonths}
                    setNumOfMonths={setNumOfMonths}
                  />
                </ChartsContainer>
              </StatsContainer>
            </ScrollView>
          ))}
      </StatsCover>
    </ScrollBackground>
  );
}
