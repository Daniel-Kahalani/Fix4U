import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChartStats, getAppointmentsPerMonth } from '../slices/statsSlices';
import { ScrollView, RefreshControl, Dimensions } from 'react-native';
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

const screenWidth = Dimensions.get('window').width - 32;

export default function StatsScreen() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.stats);
  const { info } = useSelector((state) => state.user);
  const [numOfMonths, setNumOfMonths] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  const [barChartWidth, setBarChartWidth] = useState(screenWidth);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getChartStats(numOfMonths));
    setRefreshing(false);
  };

<<<<<<< HEAD
  const handlePress3 = async () => {
    const resultAction = await dispatch(
      sendAppointmentRequest({
        faultType: 'Appliances',
        customerName: 'avi',
        customerId: 'gylgNmuG0R',
        // customerId: 'ryvZ69Uxxv',
        faultDescripton: 'computer EXPLODED',
        rspId: 'GxRhrf3b2U',
        // rspId: '3Ujj8LaiSI',
        date: '29/08/21',
        time: '09:00',
        location: 'tel aviv',
      })
    );
    if (sendAppointmentRequest.fulfilled.match(resultAction)) {
      let intervalId1 = setInterval(async () => {
        let result = await dispatch(getAppointmentRequestStatus());
        if (result.payload !== AppointmentStatus.PENDING) {
          clearInterval(intervalId1);
          //activate fucntions according to the result.payload (approved/rejected)
        }
      }, 6000);
      setTimeout(async () => {
        clearInterval(intervalId1);
        dispatch(abortAppointmentRequest());
      }, 50000);
    }

  };

  return (
    <ScrollBackground>
      <StatsCover>
        {!loading &&
          (!info || !info.rating ? (
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
                  {'Unable to show your statistics,\n please try to refresh'}
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
                  {error ? (
                    <ErrorTitle variant='body'>{error.message}</ErrorTitle>
                  ) : (
                    <Charts
                      numOfMonths={numOfMonths}
                      barChartWidth={barChartWidth}
                      pieChartWidth={screenWidth * 1.3}
                      handleMonthsRangeSelected={handleMonthsRangeSelected}
                    />
                  )}
                </ChartsContainer>
              </StatsContainer>
            </ScrollView>
          ))}
      </StatsCover>
    </ScrollBackground>
  );
}
