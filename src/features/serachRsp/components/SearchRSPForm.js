import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchType } from '../../../infrastructure/utils/constants';
import { ActivityIndicator, Colors, HelperText } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';
import {
  AuthInput,
  LargeAuthInput,
  ErrorContainer,
  AuthButton,
} from '../components/SearchStyles';
import { expertiseArr } from '../../../infrastructure/utils/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox, View } from 'react-native';
import {
  SmallAuthInput,
  Section,
  SmallSpace,
} from '../components/SearchStyles.js';
import Picker from '../../../components/utils/Picker';

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

export default function SearchRSPForm({ searchType, handleSearch }) {
  const { error, loading } = useSelector((state) => state.user);
  const [businessName, setBusinessName] = useState('');
  const [dateChosen, setDateChosen] = useState('');
  const [description, setDescription] = useState('');
  const [pickerDate, setDate] = useState(null);
  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  const [location, setLocation] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [expertiseType, setExpertiseType] = useState(expertiseTypePlaceholder);
  const [errorCheck, setErrorCheck] = useState(false);
  const showDatePicker = () => {
    setDate(new Date());
    setIsDatePickerShow(true);
  };
  const onChangeDate = (event, value) => {
    setIsDatePickerShow(false);
    if (value) {
      setDate(value);
      const dateStr = convertDateToString(value);
      setDateChosen(dateStr);
    }
  };
  const chooseToday = () => {
    const today = new Date();
    const dateStr = convertDateToString(today);
    setDateChosen(dateStr);
    return dateStr;
  };
  const hasSearchInputErrors = () => {
    return (
      (searchType === SearchType.NAME && !businessName) ||
      (searchType === SearchType.LOCATION && !location)
    );
  };

  const convertDateToString = (value) => {
    return (
      value.getDate() +
      '/' +
      (value.getMonth() > 9
        ? value.getMonth() + 1
        : '0' + (value.getMonth() + 1)) +
      '/' +
      value.getFullYear().toString().substr(-2)
    );
  };
  const hasInputErrors = () => {
    return (
      (!isSelected && !dateChosen) ||
      description <= 10 ||
      expertiseType === null ||
      hasSearchInputErrors()
    );
  };

  const handleSearchButtonClick = () => {
    setErrorCheck(true);
    const faultType = expertiseType;
    let date;
    isSelected ? (date = chooseToday()) : (date = dateChosen);
    console.log('dateChosen: ' + date);
    if (!hasInputErrors()) {
      if (searchType === SearchType.NAME) {
        console.log('in SearchType === SearchType.NAME ');
        console.log('expertiseType ' + expertiseType);
        handleSearch({
          businessName,
          location,
          faultType,
          description,
          date,
        });
      } else {
        console.log('in SearchType === SearchType.LOCATION ');
        handleSearch({
          location,
          faultType,
          description,
          date,
        });
      }
    }
  };

  return (
    <>
      {searchType === SearchType.NAME ? (
        <AuthInput
          label='Business name'
          value={businessName}
          textContentType='name'
          keyboardType='default'
          autoCapitalize='none'
          autoFocus={true}
          onChangeText={(u) => setBusinessName(u)}
        />
      ) : (
        <></>
      )}
      <HelperText
        type='error'
        visible={errorCheck && hasSearchInputErrors(searchType)}
      >
        Value must be entered!
      </HelperText>
      <AuthInput
        label='Address'
        value={location}
        textContentType='name'
        keyboardType='default'
        autoCapitalize='none'
        onChangeText={(u) => setLocation(u)}
      />
      <View>
        <Section>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text>Check to find the soon as possible</Text>
        </Section>
        {isSelected ? (
          <></>
        ) : (
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
                value={pickerDate}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </Section>
        )}
      </View>
      <HelperText type='error' visible={errorCheck && !dateChosen}>
        Date Is Missing!
      </HelperText>
      <>
        <Picker
          placeholder={{
            label: 'Select fault type',
            value: null,
            color: 'Black',
          }}
          items={expertiseTypeArray}
          onValueChange={(value) => setExpertiseType(value)}
          value={expertiseType}
        />

        <HelperText type='error' visible={errorCheck && expertiseType === null}>
          Must choose expertise
        </HelperText>
      </>
      <LargeAuthInput
        label='Description'
        value={description}
        textContentType='none'
        autoCapitalize='none'
        multiline={true}
        onChangeText={(u) => setDescription(u)}
      />
      <HelperText type='error' visible={errorCheck && description <= 10}>
        Must enter at least 10 characters
      </HelperText>
      {error && (
        <ErrorContainer size='large'>
          <Text variant='error'>{error}</Text>
        </ErrorContainer>
      )}

      <Spacer size='large'>
        {!loading ? (
          <AuthButton
            icon='account-search'
            mode='contained'
            onPress={handleSearchButtonClick}
          >
            Search
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </>
  );
}
