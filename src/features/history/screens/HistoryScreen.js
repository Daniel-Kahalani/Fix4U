import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPastAppointments } from '../slices/historySlice';
import { RefreshControl } from 'react-native';
import NoHistory from '../components/NoHistory';
import PastAppointmentsList from '../components/PastAppointmentsList';
import Text from '../../../components/utils/Text';
import {
  HistoryContainer,
  ErrorIconContainer,
  ErorIcon,
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

  useEffect(() => {
    dispatch(getPastAppointments());
  }, [dispatch]);

  return (
    <HistoryContainer>
      {!loading &&
        (error ? (
          <>
            <RefreshScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
            <ErrorIconContainer>
              <ErorIcon icon='close' bg={colors.ui.error} />
              <Text variant='body'>
                Unable to load your History, please try to refresh
              </Text>
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
    </HistoryContainer>
  );
}
