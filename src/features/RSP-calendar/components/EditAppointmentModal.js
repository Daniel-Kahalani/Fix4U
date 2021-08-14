import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Divider } from 'react-native-paper';
import { HelperText } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import {
  ButtonsSection,
  DiscardButton,
  AddButton,
  ButtonText,
  ModalContainer,
  ModalTitle,
  ModalBody,
  ModalHeader,
  AuthInput,
} from '../components/EditAppointmentModalStyles.js';
import { colors } from '../../../infrastructure/theme/colors.js';

export const EditAppointmentModal = ({
  appointment,
  isModalVisible,
  setModalVisible,
}) => {
  const [startTime, setStartTime] = useState(appointment.startTime);
  const [endTime, setEndTime] = useState(appointment.endTime);
  const [Title, setTitle] = useState(appointment.title);
  const [description, setDescription] = useState(appointment.description);
  const [errorCheck, setErrorCheck] = useState(false);
  const title = 'Edit Appointment';

  const hasTimeErrors = (time) => {
    const num = parseInt(time, 10);
    return isNaN(num) || num < 0 || num > 24 ? true : false;
  };

  const hasInputErrors = () => {
    return !startTime || !endTime || !Title || !description;
  };

  const handleNext = () => {
    setErrorCheck(true);
    !hasInputErrors() && hasTimeErrors();
    // addNewAppointment({
    //     startTime,
    //     endTime,
    //     Title,
    //     description
    //   });
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isModalVisible}
      backgroundColor={colors.ui.quaternary}
    >
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <Divider />
        </ModalHeader>

        <ModalBody>
          <Spacer size='large'>
            <AuthInput
              label='Start Time'
              value={startTime}
              textContentType='none'
              defaultValue={startTime}
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(u) => setStartTime(u)}
            />
            <HelperText
              type='error'
              visible={errorCheck && hasTimeErrors(startTime)}
            >
              Start Time is invalid!
            </HelperText>
          </Spacer>
          <Spacer size='large'>
            <AuthInput
              label='End Time'
              value={endTime}
              textContentType='none'
              defaultValue={endTime}
              keyboardType='default'
              autoCapitalize='none'
              onChangeText={(u) => setEndTime(u)}
            />
            <HelperText
              type='error'
              visible={errorCheck && hasTimeErrors(endTime)}
            >
              End Time is invalid!
            </HelperText>
          </Spacer>
          <Spacer size='large'>
            <AuthInput
              label='Title'
              value={Title}
              textContentType='none'
              defaultValue={Title}
              keyboardType='default'
              autoCapitalize='none'
              onChangeText={(u) => setTitle(u)}
            />
            <HelperText type='error' visible={errorCheck && !Title}>
              Title is invalid!
            </HelperText>
          </Spacer>
          <Spacer size='large'>
            <AuthInput
              label='Description'
              value={description}
              textContentType='none'
              defaultValue={description}
              keyboardType='default'
              autoCapitalize='none'
              onChangeText={(u) => setDescription(u)}
            />
            <HelperText type='error' visible={errorCheck && !description}>
              Task Name is invalid!
            </HelperText>
          </Spacer>
        </ModalBody>

        <Divider backgroundColor='gray' />
        <ButtonsSection>
          <DiscardButton
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}
          >
            <ButtonText>Discard</ButtonText>
          </DiscardButton>
          <AddButton>
            <ButtonText onPress={handleNext}>Save</ButtonText>
          </AddButton>
        </ButtonsSection>
      </ModalContainer>
    </Modal>
  );
};
