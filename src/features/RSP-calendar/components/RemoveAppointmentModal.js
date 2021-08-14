import React from 'react';
import { Modal, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  ButtonsSection,
  ModalBody,
  ModalContainer,
  ModalTitle,
  NoButton,
  YesButton,
} from './RemoveAppointmentModalStyles';

export const RemoveAppointmentModal = ({ isModalVisible, setModalVisible }) => {
  const title = 'Delete Appointment';
  const message = 'Are you sure you want to delete this appointment ?';

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
            <NoButton
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}
            >
              <Text>No</Text>
            </NoButton>
            <YesButton>
              <Text>Yes</Text>
            </YesButton>
          </ButtonsSection>
        </View>
      </ModalContainer>
    </Modal>
  );
};
