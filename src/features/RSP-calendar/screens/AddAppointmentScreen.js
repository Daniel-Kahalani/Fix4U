/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator, Colors, HelperText } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Spacer from '../../../components/utils/Spacer';
import {
  Cover,
  Container,
  BackgroundImage,
  AuthButton,
  AuthInput,
  Title,
  Label,
  Section,
  SafeScrollView,
  AnimationContainer,
  AnimationMsg,
  AnimationWrapper,
  MsgContainer,
  BackButtonContainer,
} from '../styles/AddAppointmentScreenStyles.js';
import {
  convertDateToString,
  convertTimeToString,
  createAppointmentTypeArray,
  convertTimeToNum,
} from '../utils.js';
import { addAppointment } from '../slices/calendarSlice.js';

const appointmentTypeArray = createAppointmentTypeArray();
const appointmentTypePlaceholder = 'Select Type Of Appointment';

export default function AddAppointmentScreen({ navigation }) {
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
  const [isAddedAppointment, setIsAddedAppointment] = useState(false);
  //const { error, loading } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const addNewAppointment = (appointment) => {
    dispatch(addAppointment({ ...appointment }));
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      clearInput();
    });
  }, [navigation]);

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
    setIsAddedAppointment(false);
  };

  const handleAddAppointmentButtonClick = () => {
    setErrorCheck(true);
    if (hasInputErrors() === false) {
      addNewAppointment({
        date: dateChoosen,
        startTime: startTimeChoosen,
        endTime: endTimeChoosen,
        appointmentType: appointmentType,
        title: title,
        description: description,
      });
      clearInput();
      setIsAddedAppointment(true);
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

  const hasTimeErrors = () => {
    return (
      convertTimeToNum(endTimeChoosen) <= convertTimeToNum(startTimeChoosen)
    );
  };

  return (
    <BackgroundImage>
      <Cover>
        {!isAddedAppointment && <Title>Add Appointment</Title>}
        {!isAddedAppointment ? (
          <Container>
            <SafeScrollView>
              <Section>
                <AuthButton
                  icon='arrow-right-circle-outline'
                  mode='contained'
                  onPress={showDatePicker}
                >
                  Pick Date
                </AuthButton>
                <Label
                  label='Date'
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
              <Section>
                <AuthButton
                  icon='arrow-right-circle-outline'
                  mode='contained'
                  onPress={showStartTimePicker}
                >
                  Pick Start Time
                </AuthButton>
                <Label
                  label='Start Time'
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
              <HelperText
                type='error'
                visible={errorCheck && !startTimeChoosen}
              >
                Start Time Missing!
              </HelperText>
              <Section>
                <AuthButton
                  icon='arrow-right-circle-outline'
                  mode='contained'
                  onPress={showEndTimePicker}
                >
                  Pick End Time
                </AuthButton>
                <Label
                  label='End Time'
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
                visible={errorCheck && (!endTimeChoosen || hasTimeErrors())}
              >
                {!endTimeChoosen
                  ? 'End Time Is Missing!'
                  : 'End Time must be after Start Time!'}
              </HelperText>
              <DropDownPicker
                open={isAppointmentTypePickerOpen}
                setOpen={setIsAppointmentTypePickerOpen}
                value={appointmentType}
                setValue={setAppointmentType}
                items={appointmentTypeArray}
                defaultIndex={0}
                placeholder={appointmentTypePlaceholder}
              />
              <HelperText
                type='error'
                visible={
                  errorCheck && appointmentType === appointmentTypePlaceholder
                }
              >
                Appointment Type Is Missing!
              </HelperText>
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
                  Title is Missing!
                </HelperText>
              </Spacer>
              <Spacer size='small'>
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
                  Description is Missing!
                </HelperText>
              </Spacer>
              <Spacer size='small'>
                <AuthButton
                  icon='calendar-plus'
                  mode='contained'
                  onPress={handleAddAppointmentButtonClick}
                >
                  Add
                </AuthButton>
                {/* {!loading ? (
                  <AuthButton
                    //icon='account-search'
                    mode='contained'
                    onPress={handleAddAppointmentButtonClick}
                  >
                    Add
                  </AuthButton>
                ) : (
                  <ActivityIndicator animating={true} color={Colors.blue300} />
                )} */}
              </Spacer>
            </SafeScrollView>
          </Container>
        ) : (
          <AnimationContainer>
            <AnimationWrapper>
              <LottieView
                key='animation'
                autoPlay
                loop={false}
                source={require('../../../../assets/animations/added_appointment.json')}
              />
            </AnimationWrapper>
            <MsgContainer>
              <AnimationMsg>Appointment Added Successfully</AnimationMsg>
            </MsgContainer>
            <BackButtonContainer>
              <AuthButton onPress={() => navigation.navigate('Calendar')}>
                Back To Calendar
              </AuthButton>
            </BackButtonContainer>
          </AnimationContainer>
        )}
      </Cover>
    </BackgroundImage>
  );
}
