/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../slices/inboxSlice';
import { Colors, Snackbar } from 'react-native-paper';
import { RefreshControl, TouchableOpacity } from 'react-native';
import Notification from '../components/Notification';
import Spacer from '../../../components/utils/Spacer';
import FadeInView from '../../../components/animations/FadeInView';
import {
  InboxContainer,
  NotificationList,
  ErrorIconContainer,
  ErorIcon,
  RefreshScrollView,
  AnimationContainer,
  AnimationWrapper,
  AnimationMsg,
  MsgContainer,
} from '../styles/inboxStyles';
import LottieView from 'lottie-react-native';
import { colors } from '../../../infrastructure/theme/colors';
import Text from '../../../components/utils/Text';

export default function InboxScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  // const feedbackMsg = route.params ? route.params.feedbackMsg : null;
  // console.log('route.params ', route.params);
  // const [snackbarMsg, setSnackbarMsg] = useState(feedbackMsg);
  // const [snackbarVisible, setSnackbarVisible] = useState(
  //   feedbackMsg ? true : false
  // );
  // console.log('snackbarVisible ', snackbarVisible);
  // const feedbackMsg = route.params ? route.params.feedbackMsg : null;
  // console.log('route.params ', route.params);
  // const [snackbarMsg, setSnackbarMsg] = useState('');
  // const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { loading, error, notifications } = useSelector((state) => state.inbox);
  useEffect(() => {
    console.log('useEffect inboxScreen getNotifications');

    dispatch(getNotifications());
    // const feedbackMsg = route.params ? route.params.feedbackMsg : null;
    // setSnackbarMsg(feedbackMsg);
    // setSnackbarVisible(feedbackMsg ? true : false);
  }, [dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log('onRefresh getNotifications');
    await dispatch(getNotifications());
    setRefreshing(false);
  }, [dispatch]);

  return (
    <InboxContainer>
      {!loading &&
        (error ? (
          <>
            <RefreshScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            ></RefreshScrollView>
            <ErrorIconContainer>
              <ErorIcon icon='close' bg={colors.ui.error} />
              <Text variant='body'>
                Unable to load your inbox, please try again
              </Text>
            </ErrorIconContainer>
          </>
        ) : notifications.length === 0 ? (
          <>
            <RefreshScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            ></RefreshScrollView>
            <AnimationContainer>
              <AnimationWrapper>
                <LottieView
                  key='animation'
                  autoPlay
                  loop={false}
                  source={require('../../../../assets/animations/empty_inbox.json')}
                />
              </AnimationWrapper>
              <MsgContainer>
                <AnimationMsg>Your Inbox is Empty</AnimationMsg>
              </MsgContainer>
            </AnimationContainer>
          </>
        ) : (
          <NotificationList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={notifications}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NotificationDetails', {
                    notification: item,
                  })
                }
              >
                <Spacer position='bottom'>
                  <FadeInView>
                    <Notification notification={item} isFullDispaly={false} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        ))}
      {/* <Snackbar
        visible={snackbarVisible}
        duration={3000}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            () => setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMsg}
      </Snackbar> */}
    </InboxContainer>
  );
}
