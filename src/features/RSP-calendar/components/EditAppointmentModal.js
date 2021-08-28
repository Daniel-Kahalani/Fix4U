/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
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
} from '../styles/EditAppointmentModalStyles.js';
import { colors } from '../../../infrastructure/theme/colors.js';
import { editAppointment } from '../slices/calendarSlice';
import {
  convertDateToString,
  convertTimeToString,
  createAppointmentTypeArray,
} from '../utils.js';

const appointmentTypeArray = createAppointmentTypeArray();
const modalTitle = 'Edit Appointment';
const appointmentTypePlaceholder = 'Select Type Of Appointment';

export const EditAppointmentModal = ({
  appointment,
  isModalVisible,
  setModalVisible,
}) => {
  const [startTimeChoosen, setStartTimeChoosen] = useState(
    appointment.startTime
  );
  const [startTime, setStartTime] = useState(null);
  const [isStartTimePickerShow, setIsStartTimePickerShow] = useState(false);
  const [endTimeChoosen, setEndTimeChoosen] = useState(appointment.endTime);
  const [endTime, setEndTime] = useState(null);
  const [isEndTimePickerShow, setIsEndTimePickerShow] = useState(false);
  const [appointmentType, setAppointmentType] = useState(
    appointment.appointmentType
  );
  const [isAppointmentTypePickerOpen, setIsAppointmentTypePickerOpen] =
    useState(false);
  const [title, setTitle] = useState(appointment.title);
  const [description, setDescription] = useState(appointment.description);
  const [errorCheck, setErrorCheck] = useState(false);
  const [dateChoosen, setDateChoosen] = useState(appointment.date);
  const [date, setDate] = useState(null);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);

  const dispatch = useDispatch();

  const editRSPAppointment = async (appointment) => {
    await dispatch(editAppointment(appointment));
  };

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

  const handleSaveButtonClick = () => {
    setErrorCheck(true);
    if (hasInputErrors() === false) {
      setModalVisible(!isModalVisible);
      editRSPAppointment({
        appointmentId: appointment.appointmentId,
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

  const handleDiscardButtonClick = () => {
    setModalVisible(!isModalVisible);
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
            placeholder={appointmentType}
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
          <DiscardButton onPress={handleDiscardButtonClick}>
            <ButtonText>Discard</ButtonText>
          </DiscardButton>
          <AddButton>
            <ButtonText onPress={handleSaveButtonClick}>Update</ButtonText>
          </AddButton>
        </Section>
      </ModalContainer>
    </Modal>
  );
};
