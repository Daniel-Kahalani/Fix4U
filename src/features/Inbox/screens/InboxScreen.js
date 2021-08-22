import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../slices/inboxSlice';
import { Colors } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import NotificationInfoCard from '../components/NotificationInfoCard';
import Spacer from '../../../components/utils/Spacer';
import FadeInView from '../../../components/animations/FadeInView';
import {
  InboxContainer,
  Loading,
  LoadingContainer,
  NotificationList,
  ErrorIconContainer,
  ErorIcon,
} from '../styles/inboxStyles';
import { colors } from '../../../infrastructure/theme/colors';
import Text from '../../../components/utils/Text';

export default function InboxScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error, notifications } = useSelector((state) => state.inbox);
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <InboxContainer>
      {loading && (
        <LoadingContainer>
          <Loading size={80} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      {error ? (
        <ErrorIconContainer>
          <ErorIcon icon='close' bg={colors.ui.error} />
          <Text variant='body'>
            Unable to load your inbox, please try again
          </Text>
        </ErrorIconContainer>
      ) : notifications.length === 0 ? (
        <ErrorIconContainer>
          <ErorIcon icon='close' bg={colors.ui.error} />
          <Text variant='body'>Yout inbox is empty</Text>
        </ErrorIconContainer>
      ) : (
        <NotificationList
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
                  <NotificationInfoCard
                    notification={item}
                    isFullDispaly={false}
                  />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </InboxContainer>
  );
}
