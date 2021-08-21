import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../slices/searchResultSlice';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import { expertiseArr } from '../../../infrastructure/constants';
import SelectDropdown from 'react-native-select-dropdown';
// import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  SearchCover,
  SearchContainer,
  SafeScrollView,
  ScrollBackground,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from '../components/SearchStyles.js';

export default function SearchByNameScreen({ navigation }) {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <ScrollBackground>
      <SearchCover />
      <Title>Search By Name</Title>
      <SearchContainer>
        <SafeScrollView>
          <AuthInput
            label='Business name'
            value={businessName}
            textContentType='name'
            keyboardType='default'
            autoCapitalize='none'
            onChangeText={(u) => setBusinessName(u)}
          />
          <Spacer size='large'>
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
          )}
          <Spacer size='large'>
            <AuthInput
              label='Description'
              value={description}
              textContentType='none'
              autoCapitalize='none'
              onChangeText={(u) => setDescription(u)}
            />
          </Spacer>
          {error && (
            <ErrorContainer size='large'>
              <Text variant='error'>{error}</Text>
            </ErrorContainer>
          )}
          {/* <DatePicker date={date} onDateChange={setDate} /> */}
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
        </SafeScrollView>
      </SearchContainer>
    </ScrollBackground>
  );
}
