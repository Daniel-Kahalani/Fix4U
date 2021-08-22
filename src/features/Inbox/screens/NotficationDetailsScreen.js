import React from 'react';
import { ScrollView } from 'react-native';
import { NotificationDetailsContainer } from '../styles/notficationDetailsStyles';
import NotificationInfoCard from '../components/NotificationInfoCard';
export default function NotficationDetailsScreen({ route }) {
  const { notification } = route.params;

  return (
    <ScrollView>
      <NotificationDetailsContainer>
        <NotificationInfoCard
          notification={notification}
          isFullDispaly={true}
        />
      </NotificationDetailsContainer>
    </ScrollView>
  );
}
