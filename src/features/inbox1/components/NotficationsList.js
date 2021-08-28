import React from 'react';
import { useSelector } from 'react-redux';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Notification from './Notification';
import Spacer from '../../../components/utils/Spacer';
import FadeInView from '../../../components/animations/FadeInView';
import { NotificationsFlatList } from '../styles/inboxStyles';

export default function NotficationsList({ refreshing, handleRefresh }) {
  const { notifications } = useSelector((state) => state.inbox);
  const navigation = useNavigation();

  return (
    <NotificationsFlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
  );
}
