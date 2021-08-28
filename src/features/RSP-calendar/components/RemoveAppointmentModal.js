/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  ButtonsSection,
  ModalBody,
  ModalContainer,
  ModalTitle,
  NoButton,
  YesButton,
} from '../styles/RemoveAppointmentModalStyles';
import { deleteAppointment } from '../slices/calendarSlice';

export const RemoveAppointmentModal = ({
  isModalVisible,
  setModalVisible,
  appointmentId,
}) => {
  const title = 'Delete Appointment';
  const message = 'Are you sure you want to delete this appointment ?';

  const dispatch = useDispatch();

  const deleteRSPAppointment = async (appointmentId) => {
    await dispatch(deleteAppointment({ appointmentId }));
  };

  const handleDeleteRSPAppointmentButtonClick = () => {
    setModalVisible(!isModalVisible);
    deleteRSPAppointment(appointmentId);
  };

  const handleNotDeleteRSPAppointmentButtonClick = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal animationType='fade' transparent={true} visible={isModalVisible}>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <Divider />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <View>
          <Divider />
          <ButtonsSection>
            <NoButton onPress={handleNotDeleteRSPAppointmentButtonClick}>
              <Text>No</Text>
            </NoButton>
            <YesButton onPress={handleDeleteRSPAppointmentButtonClick}>
              <Text>Yes</Text>
            </YesButton>
          </ButtonsSection>
        </View>
      </ModalContainer>
    </Modal>
  );
};
