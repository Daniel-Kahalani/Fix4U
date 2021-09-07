/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, Colors, HelperText } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Picker from '../../../components/utils/Picker.js';
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
} from '../styles/EditAppointmentScreenStyles.js';
import {
  convertDateToString,
  convertTimeToString,
  createAppointmentTypeArray,
  convertTimeToNum,
} from '../utils.js';
import { editAppointment, loadAppointments } from '../slices/calendarSlice.js';

const appointmentTypeArray = createAppointmentTypeArray();
const appointmentTypePlaceholder = {
  label: 'Select Type Of Appointment',
  value: null,
};

export default function EditAppointmentScreen({ route, navigation }) {
  const [startTimeChoosen, setStartTimeChoosen] = useState(
    route.params.startTime
  );
  const [startTime, setStartTime] = useState(null);
  const [isStartTimePickerShow, setIsStartTimePickerShow] = useState(false);
  const [endTimeChoosen, setEndTimeChoosen] = useState(route.params.endTime);
  const [endTime, setEndTime] = useState(null);
  const [isEndTimePickerShow, setIsEndTimePickerShow] = useState(false);
  const [appointmentType, setAppointmentType] = useState(
    route.params.appointmentType
  );
  const [title, setTitle] = useState(route.params.title);
  const [description, setDescription] = useState(route.params.description);
  const [errorCheck, setErrorCheck] = useState(false);
  const [dateChoosen, setDateChoosen] = useState(route.params.date);
  const [date, setDate] = useState(null);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  const [isUpdatedAppointment, setIsUpdatedAppointment] = useState(false);
  const { loading } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const editRSPAppointment = async (appointment) => {
    await dispatch(editAppointment(appointment));
    const year = parseInt(appointment.date.slice(0, 4), 10);
    const month = parseInt(appointment.date.slice(5, 7), 10);
    await dispatch(loadAppointments({ year, month }));
    console.log(`loading appointments... ${year}, ${month}`);
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
      hasTimeErrors() ||
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
    setAppointmentType(appointmentTypePlaceholder.value);
    setTitle('');
    setDescription('');
    setErrorCheck(false);
    setIsUpdatedAppointment(false);
  };

  const handleSaveButtonClick = () => {
    setErrorCheck(true);
    if (hasInputErrors() === false) {
      editRSPAppointment({
        appointmentId: route.params.appointmentId,
        date: dateChoosen,
        startTime: startTimeChoosen,
        endTime: endTimeChoosen,
        appointmentType: appointmentType,
        title: title,
        description: description,
      });
      clearInput();
      setIsUpdatedAppointment(true);
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
    const startTimeNum = convertTimeToNum(startTimeChoosen);
    const endTimeNum = convertTimeToNum(endTimeChoosen);
    return endTimeNum <= startTimeNum;
  };

  return (
    <BackgroundImage>
      <Cover>
        {!isUpdatedAppointment && <Title>Edit Appointment</Title>}
        {!isUpdatedAppointment ? (
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
              <Picker
                placeholder={appointmentTypePlaceholder}
                items={appointmentTypeArray}
                onValueChange={setAppointmentType}
                value={appointmentType}
              />
              <HelperText
                type='error'
                visible={
                  errorCheck &&
                  appointmentType === appointmentTypePlaceholder.value
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
                {!loading ? (
                  <AuthButton
                    icon='content-save-edit-outline'
                    mode='contained'
                    onPress={handleSaveButtonClick}
                  >
                    Save
                  </AuthButton>
                ) : (
                  <ActivityIndicator animating={true} color={Colors.blue300} />
                )}
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
              <AnimationMsg>Appointment Updated Successfully</AnimationMsg>
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
