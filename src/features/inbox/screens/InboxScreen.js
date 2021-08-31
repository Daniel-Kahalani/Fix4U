import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../slices/inboxSlice';
import { RefreshControl } from 'react-native';
import InboxEmpty from '../components/InboxEmpty';
import NotficationsList from '../components/NotficationsList';
import Snackbar from '../../../components/utils/Snackbar';
import {
  InboxContainer,
  InboxBackground,
  InboxCover,
  ErrorIconContainer,
  ErorIcon,
  Title,
  RefreshScrollView,
} from '../styles/inboxStyles';
import { colors } from '../../../infrastructure/theme/colors';

export default function InboxScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { loading, error, notifications } = useSelector((state) => state.inbox);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const feedback = route.params ? route.params.feedback : null;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(getNotifications());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setSnackbarVisible(feedback ? true : false);
  }, [feedback]);

  return (
    <InboxContainer>
      <InboxBackground>
        <InboxCover>
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
            ) : notifications.length === 0 ? (
              <InboxEmpty refreshing={refreshing} handelRefresh={onRefresh} />
            ) : (
              <NotficationsList
                refreshing={refreshing}
                handleRefresh={onRefresh}
              />
            ))}
          <Snackbar
            visible={snackbarVisible}
            type={feedback ? feedback.type : null}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: 'Dismiss',
              onPress: () => setSnackbarVisible(false),
            }}
          >
            {feedback ? feedback.message : ''}
          </Snackbar>
        </InboxCover>
      </InboxBackground>
    </InboxContainer>
  );
}
