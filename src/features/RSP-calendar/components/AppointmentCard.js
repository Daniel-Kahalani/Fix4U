import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Divider, Portal } from 'react-native-paper';
import {
  AppointmentCardContainer,
  AppointmentInfoCard,
  AvatarContainer,
  Time,
  Info,
  Title,
  CustomerDetails,
  ButtonsSection,
} from '../styles/AppointmentCardStyles.js';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from '../../../components/utils/Spacer.js';
import { RemoveAppointmentDialog } from './RemoveAppointmentDialog.js';
import { useNavigation } from '@react-navigation/native';
import { AppointmentType } from '../../../infrastructure/utils/constants';

export const AppointmentCard = ({ appointment }) => {
  const {
    appointmentId,
    startTime,
    endTime,
    appointmentType,
    title,
    description,
    customerName,
    location,
  } = appointment;
  const iconSize = 30;
  const appointmentTypeAvatar = appointmentType
    .toString()
    .slice(0, 1)
    .toUpperCase();

  const [isRemoveDialogVisible, setRemoveDialogVisible] = useState(false);

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    avatar: {
      backgroundColor:
        appointmentType === AppointmentType.PERSONAL
          ? 'blue'
          : appointmentType === AppointmentType.SUPPLIER
          ? 'purple'
          : 'red',
    },
  });

  return (
    <AppointmentCardContainer>
      <Portal>
        <RemoveAppointmentDialog
          isVisible={isRemoveDialogVisible}
          setVisible={setRemoveDialogVisible}
          appointmentId={appointmentId}
        />
      </Portal>
      {appointmentType !== AppointmentType.CUSTOMER && (
        <ButtonsSection>
          <Spacer size='large'>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditAppointment', appointment)
              }
            >
              <FontAwesome5 name='edit' size={iconSize} color='black' />
            </TouchableOpacity>
          </Spacer>
          <Spacer size='large'>
            <TouchableOpacity
              onPress={() => setRemoveDialogVisible(!isRemoveDialogVisible)}
            >
              <Ionicons
                name='remove-circle-outline'
                size={iconSize}
                color={'black'}
              />
            </TouchableOpacity>
          </Spacer>
        </ButtonsSection>
      )}
      <AppointmentInfoCard elevation={1}>
        <AvatarContainer>
          <Avatar.Text
            style={styles.avatar}
            size={28}
            label={appointmentTypeAvatar}
          />
        </AvatarContainer>
        <Info>
          <Time>
            <Text variant='label'>
              {startTime} - {endTime}
            </Text>
            <Divider />
          </Time>
          {appointmentType === AppointmentType.CUSTOMER && (
            <View>
              <CustomerDetails>
                <Text variant='label'>{customerName}</Text>
                <Divider />
              </CustomerDetails>
              <Title>
                <Text variant='label'>{location}</Text>
                <Divider />
              </Title>
            </View>
          )}
          <Title>
            <Text variant='label'>{title}</Text>
            <Divider />
          </Title>
          <Text variant='label'>{description}</Text>
        </Info>
      </AppointmentInfoCard>
    </AppointmentCardContainer>
  );
};
