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
} from '../components/AddAppointmentModalStyles.js';
import { colors } from '../../../infrastructure/theme/colors.js';

export const AddAppointmentModal = ({ isModalVisible, setModalVisible }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [Title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorCheck, setErrorCheck] = useState(false);
  const title = 'Add new Appointment';

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
              keyboardType='default'
              autoCapitalize='none'
              onChangeText={(u) => setTitle(u)}
            />
            <HelperText type='error' visible={errorCheck && !Title}>
              Task Name is invalid!
            </HelperText>
          </Spacer>
          <Spacer size='large'>
            <AuthInput
              label='Description'
              value={description}
              textContentType='none'
              keyboardType='default'
              autoCapitalize='none'
              onChangeText={(u) => setDescription(u)}
            />
            <HelperText type='error' visible={errorCheck && !description}>
              Title is invalid!
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
            <ButtonText onPress={handleNext}>Add</ButtonText>
          </AddButton>
        </ButtonsSection>
      </ModalContainer>
    </Modal>
  );
};
