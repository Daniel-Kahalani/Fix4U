/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
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
} from '../styles/AddAppointmentModalStyles.js';
import { colors } from '../../../infrastructure/theme/colors.js';
import {
  convertDateToString,
  convertTimeToString,
  createAppointmentTypeArray,
} from '../utils.js';

const appointmentTypeArray = createAppointmentTypeArray();
const modalTitle = 'Add new Appointment';
const appointmentTypePlaceholder = 'Select Type Of Appointment';

export const AddAppointmentModal = ({
  isModalVisible,
  setModalVisible,
  handleAddAppointment,
}) => {
  const [startTimeChoosen, setStartTimeChoosen] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isStartTimePickerShow, setIsStartTimePickerShow] = useState(false);
  const [endTimeChoosen, setEndTimeChoosen] = useState('');
  const [endTime, setEndTime] = useState(null);
  const [isEndTimePickerShow, setIsEndTimePickerShow] = useState(false);
  const [appointmentType, setAppointmentType] = useState(
    appointmentTypePlaceholder
  );
  const [isAppointmentTypePickerOpen, setIsAppointmentTypePickerOpen] =
    useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorCheck, setErrorCheck] = useState(false);
  const [dateChoosen, setDateChoosen] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);

  // const hasEndTimeError = (startTimeValue, endTimeValue) => {
  //   console.log(startTimeValue);
  //   console.log(endTimeValue);
  //   console.log('-----------');
  //   const endHourStr = endTimeValue.split(':')[0];
  //   const endMinStr = endTimeValue.split(':')[1];
  //   console.log(endHourStr);
  //   console.log(endMinStr);
  //   console.log('-----------');

  //   const endHour = parseInt(endHourStr, 10);
  //   const endMin = parseInt(endMinStr, 10);
  //   const startHourStr = startTimeValue.split(':')[0];
  //   const startMinStr = startTimeValue.split(':')[1];
  //   console.log(startHourStr);
  //   console.log(startMinStr);
  //   const startHour = parseInt(startHourStr, 10);
  //   const startMin = parseInt(startMinStr, 10);

  //   return endHour < startHour || (endHour === startHour && endMin < startMin)
  //     ? true
  //     : false;
  // };

  const hasInputErrors = () => {
    return !dateChoosen ||
      !startTimeChoosen ||
      !endTimeChoosen ||
      !appointmentType ||
      !title ||
      !description
      ? true
      : false;
  };

  const clearInput = () => {
    setDateChoosen('');
    setStartTimeChoosen('');
    setEndTimeChoosen('');
    setAppointmentType(appointmentTypePlaceholder);
    setTitle('');
    setDescription('');
    setErrorCheck(false);
  };

  const handleAddAppointmentButtonClick = () => {
    setErrorCheck(true);
    if (hasInputErrors() === false) {
      setModalVisible(!isModalVisible);
      handleAddAppointment({
        date: dateChoosen,
        startTime: startTimeChoosen,
        endTime: endTimeChoosen,
        appointmentType: appointmentType,
        title: title,
        description: description,
      });
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
      const dateStr = convertDateToString(value);
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
          <HelperText type='error' visible={errorCheck && !dateChoosen}>
            Date Is Missing!
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
          <HelperText type='error' visible={errorCheck && !startTimeChoosen}>
            Start Time Missing!
          </HelperText>
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
          <HelperText
            type='error'
            visible={
              errorCheck && !endTimeChoosen
              // hasEndTimeError(startTimeChoosen, endTimeChoosen))
            }
          >
            End Time is invalid!
          </HelperText>

          <Divider backgroundColor='gray' />
          <DropDownPicker
            open={isAppointmentTypePickerOpen}
            setOpen={setIsAppointmentTypePickerOpen}
            value={appointmentType}
            setValue={setAppointmentType}
            items={appointmentTypeArray}
            defaultIndex={0}
            placeholder={appointmentTypePlaceholder}
          />
          <Divider backgroundColor='gray' />
          <Spacer size='large'>
            <AuthInput
              label='title'
              value={title}
              textContentType='none'
              keyboardType='default'
              autoCapitalize='none'
              maxLength={50}
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
              maxLength={100}
              onChangeText={(u) => setDescription(u)}
            />
            <HelperText type='error' visible={errorCheck && !description}>
              Description is invalid!
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
