import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPastAppointments } from '../slices/historySlice';
import { RefreshControl } from 'react-native';
import NoHistory from '../components/NoHistory';
import PastAppointmentsList from '../components/PastAppointmentsList';
import {
  HistoryContainer,
  HistoryBackground,
  HistoryCover,
  ErrorIconContainer,
  ErorIcon,
  Title,
  RefreshScrollView,
} from '../styles/historyStyles';
import { colors } from '../../../infrastructure/theme/colors';

export default function HistoryScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { loading, error, pastAppointments } = useSelector(
    (state) => state.history
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(getPastAppointments());
    setRefreshing(false);
  }, [dispatch]);

  return (
    <HistoryContainer>
      <HistoryBackground>
        <HistoryCover>
          {!loading &&
            (error ? (
              <>
                <RefreshScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
                <ErrorIconContainer>
                  <ErorIcon icon='close' bg={colors.ui.error} />
                  <Title variant='body'>{error.message}</Title>
                </ErrorIconContainer>
              </>
            ) : pastAppointments.length === 0 ? (
              <NoHistory refreshing={refreshing} handelRefresh={onRefresh} />
            ) : (
              <PastAppointmentsList
                refreshing={refreshing}
                handleRefresh={onRefresh}
              />
            ))}
        </HistoryCover>
      </HistoryBackground>
    </HistoryContainer>
  );
}
