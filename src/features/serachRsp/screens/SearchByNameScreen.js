import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../slices/searchRSPSlice';
import {
  ActivityIndicator,
  Colors,
  HelperText,
  Divider,
} from 'react-native-paper';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import { expertiseArr } from '../../../infrastructure/utils/constants';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  SearchCover,
  SearchContainer,
  SafeScrollView,
  ScrollBackground,
  AuthButton,
  AuthInput,
  SmallAuthInput,
  ErrorContainer,
  Title,
  Section,
  SmallSpace,
} from '../components/SearchStyles.js';

const createExpertiseTypeArray = () => {
  let expertiseTypeArray = [];
  expertiseArr.forEach((element) => {
    if (element.name !== 'Customer') {
      expertiseTypeArray.push({ label: element.name, value: element.name });
    }
  });
  return expertiseTypeArray;
};

const expertiseTypeArray = createExpertiseTypeArray();
const expertiseTypePlaceholder = 'Select expertise';

export default function SearchByNameScreen({ navigation }) {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const [businessName, setBusinessName] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [description, setDescription] = useState('');

  const [errorCheck, setErrorCheck] = useState(false);
  const [dateChosen, setDateChosen] = useState('');
  const [date, setDate] = useState(null);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  const [expertiseType, setExpertiseType] = useState(expertiseTypePlaceholder);
  const [isExpertiseTypePickerOpen, setIsExpertiseTypePickerOpen] =
    useState(false);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  const showDatePicker = () => {
    setDate(new Date());
    setIsDatePickerShow(true);
  };

  // const clearInput = () => {
  //   setDateChoosen('');
  //   setStartTimeChoosen('');
  //   setEndTimeChoosen('');
  //   setAppointmentType(appointmentTypePlaceholder);
  //   setTitle('');
  //   setDescription('');
  //   setErrorCheck(false);
  // };

  const onChangeDate = (event, value) => {
    setIsDatePickerShow(false);
    if (value) {
      setDate(value);
      const dateStr = convertDateToString(value);
      setDateChosen(dateStr);
    }
  };
  const convertDateToString = (value) => {
    return (
      value.getFullYear() +
      '-' +
      (value.getMonth() > 9 ? value.getMonth() : '0' + value.getMonth()) +
      '-' +
      value.getDate()
    );
  };

  return (
    <ScrollBackground>
      <SearchCover />
      <Title>Search By Name</Title>
      <SearchContainer>
        <AuthInput
          label='Business name'
          value={businessName}
          textContentType='name'
          keyboardType='default'
          autoCapitalize='none'
          onChangeText={(u) => setBusinessName(u)}
        />
        {/* <Spacer size='large'>
          <SelectDropdown
            data={expertiseArr}
            value={expertise}
            defaultButtonText='Choose Expertise'
            onSelect={(selectedItem, index) => {
              (u) => setExpertise(u);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
          />
        </Spacer>
        {error && (
          <ErrorContainer size='large'>
            <Text variant='error'>{error}</Text>
          </ErrorContainer>
        )} */}
        <Spacer size='large'>
          <Section>
            <AuthButton
              icon='timetable'
              mode='contained'
              onPress={showDatePicker}
            >
              Pick Date
            </AuthButton>
            <SmallSpace />
            <SmallAuthInput
              label='Date chosen'
              value={dateChosen}
              textContentType='none'
              keyboardType='email-address'
              autoCapitalize='none'
              editable={false}
              selectTextOnFocus={false}
            />
            {isDatePickerShow && (
              <DateTimePicker
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </Section>
          <HelperText type='error' visible={errorCheck && !dateChosen}>
            Date Is Missing!
          </HelperText>
        </Spacer>
        <DropDownPicker
          open={isExpertiseTypePickerOpen}
          setOpen={setIsExpertiseTypePickerOpen}
          value={expertiseType}
          setValue={setExpertiseType}
          items={expertiseTypeArray}
          defaultIndex={0}
          placeholder={expertiseTypePlaceholder}
        />
        <HelperText type='error' visible={errorCheck && expertiseType === null}>
          Must choose at least one expertise
        </HelperText>
        <Spacer size='large'>
          <AuthInput
            label='Description'
            value={description}
            textContentType='none'
            autoCapitalize='none'
            onChangeText={(u) => setDescription(u)}
          />
          {error && (
            <ErrorContainer size='large'>
              <Text variant='error'>{error}</Text>
            </ErrorContainer>
          )}
        </Spacer>
        <Spacer size='large'>
          {!loading ? (
            <AuthButton
              icon='account-search'
              mode='contained'
              onPress={() => navigation.navigate('SearchResult', {})}
            >
              Search
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </SearchContainer>
    </ScrollBackground>
  );
}
