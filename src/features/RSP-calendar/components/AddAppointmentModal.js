/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Divider } from 'react-native-paper';
import { HelperText } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import {
  Section,
  DiscardButton,
  AddButton,
  ButtonText,
  ModalContainer,
  ModalTitle,
  ModalBody,
  ModalHeader,
  AuthInput,
  Label,
  ChooseButton,
} from '../components/AddAppointmentModalStyles.js';
import { colors } from '../../../infrastructure/theme/colors.js';
import DateTimePicker from '@react-native-community/datetimepicker';

export const AddAppointmentModal = ({
  isModalVisible,
  setModalVisible,
  handleAddAppointment,
}) => {
  const modalTitle = 'Add new Appointment';
  const [startTimeChoosen, setStartTimeChoosen] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isStartTimePickerShow, setIsStartTimePickerShow] = useState(false);
  const [endTimeChoosen, setEndTimeChoosen] = useState('');
  const [endTime, setEndTime] = useState(null);
  const [isEndTimePickerShow, setIsEndTimePickerShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorCheck, setErrorCheck] = useState(false);
  const [dateChoosen, setDateChoosen] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);

  const hasTimeErrors = (time) => {
    const num = parseInt(time, 10);
    return isNaN(num) || num < 0 || num > 24 ? true : false;
  };

  const hasInputErrors = () => {
    return !startTime || !endTime || !title || !description ? true : false;
  };

  const clearInput = () => {
    setDate('');
    setStartTimeChoosen('');
    setEndTimeChoosen('');
    setTitle('');
    setDescription('');
    setErrorCheck(false);
  };

  const handleAddAppointmentButtonClick = () => {
    setErrorCheck(true);
    if (
      hasInputErrors() === false &&
      hasTimeErrors(startTime) === false &&
      hasTimeErrors(endTime) === false
    ) {
      handleAddAppointment({ startTime, endTime, title, description });
      clearInput();
    }
  };

  const showDatePicker = () => {
    setDate(new Date());
    setIsDatePickerShow(true);
  };

  const showStartTimePicker = () => {
    setStartTime(new Date());
    setIsStartTimePickerShow(true);
  };

  const showEndTimePicker = () => {
    setEndTime(new Date());
    setIsEndTimePickerShow(true);
  };

  const onChangeDate = (event, value) => {
    setIsDatePickerShow(false);
    if (value) {
      setDate(value);
      const dateStr = convertDateTimeToString(value);
      setDateChoosen(dateStr);
    }
  };

  const onChangeStartTime = (event, value) => {
    setIsStartTimePickerShow(false);
    if (value) {
      setStartTime(value);
      const startTimeStr = convertTimeToString(value);
      setStartTimeChoosen(startTimeStr);
    }
  };

  const onChangeEndTime = (event, value) => {
    setIsEndTimePickerShow(false);
    if (value) {
      setEndTime(value);
      const endTimeStr = convertTimeToString(value);
      setEndTimeChoosen(endTimeStr);
    }
  };

  const convertDateTimeToString = (value) => {
    return value.toISOString().slice(0, 10);
  };

  const convertTimeToString = (value) => {
    return value.getHours() + ':' + value.getMinutes();
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
          <ModalTitle>{modalTitle}</ModalTitle>
          <Divider />
        </ModalHeader>

        <ModalBody>
          <Section>
            <ChooseButton onPress={showDatePicker}>
              <ButtonText>Pick Date</ButtonText>
            </ChooseButton>
            <Label
              label='Date choosen'
              value={dateChoosen}
              textContentType='none'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            {isDatePickerShow && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </Section>
          <HelperText
            type='error'
            visible={errorCheck && hasTimeErrors(startTime)}
          >
            Start Time is invalid!
          </HelperText>
          <Divider backgroundColor='gray' />

          <Section>
            <ChooseButton onPress={showStartTimePicker}>
              <ButtonText>Pick Start Time</ButtonText>
            </ChooseButton>
            <Label
              label='Start Time choosen'
              value={startTimeChoosen}
              textContentType='none'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            {isStartTimePickerShow && (
              <DateTimePicker
                value={startTime}
                mode={'time'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                minuteInterval={30}
                onChange={onChangeStartTime}
              />
            )}
          </Section>
          {/* <HelperText
            type='error'
            visible={errorCheck && hasTimeErrors(startTime)}
          >
            Start Time is invalid!
          </HelperText> */}
          <Divider backgroundColor='gray' />
          <Section>
            <ChooseButton onPress={showEndTimePicker}>
              <ButtonText>Pick End Time</ButtonText>
            </ChooseButton>
            <Label
              label='End Time choosen'
              value={endTimeChoosen}
              textContentType='none'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            {isEndTimePickerShow && (
              <DateTimePicker
                value={endTime}
                mode={'time'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                minuteInterval={30}
                onChange={onChangeEndTime}
              />
            )}
          </Section>
          {/* <HelperText
            type='error'
            visible={errorCheck && hasTimeErrors(endTime)}
          >
            End Time is invalid!
          </HelperText> */}

          <Divider backgroundColor='gray' />
          {/* <Spacer size='large'>
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
          </Spacer> */}
          <Spacer size='large'>
            <AuthInput
              label='title'
              value={title}
              textContentType='none'
              keyboardType='default'
              autoCapitalize='none'
              onChangeText={(u) => setTitle(u)}
            />
            <HelperText type='error' visible={errorCheck && !title}>
              Title is invalid!
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
              title is invalid!
            </HelperText>
          </Spacer>
        </ModalBody>

        <Divider backgroundColor='gray' />
        <Section>
          <DiscardButton
            onPress={() => {
              setModalVisible(!isModalVisible);
              clearInput();
            }}
          >
            <ButtonText>Discard</ButtonText>
          </DiscardButton>
          <AddButton>
            <ButtonText onPress={handleAddAppointmentButtonClick}>
              Add
            </ButtonText>
          </AddButton>
        </Section>
      </ModalContainer>
    </Modal>
  );
};
