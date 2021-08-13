import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../slices/userSlice';
import { ScrollView } from 'react-native';
import PersonalInfoForm from '../components/PersonalInfoForm';
import Spacer from '../../../components/utils/Spacer';
import { AccountCover, FormContainer, Title } from '../styles/accountStyles';
import { ScrollBackground, RegisterContainer } from '../styles/registerStyles';

export default function PersonalInfoScreen({ route }) {
  const dispatch = useDispatch();

  const registerNewUser = (personalInfo) => {
    dispatch(register({ ...personalInfo, ...route.params }));
  };

  return (
    <ScrollBackground>
      <AccountCover />
      <ScrollView>
        <RegisterContainer>
          <Title>Personal Information</Title>
          <Spacer size='large' />
          <FormContainer>
            <PersonalInfoForm
              userType={route.params.userType}
              handleRegister={registerNewUser}
            />
          </FormContainer>
        </RegisterContainer>
      </ScrollView>
    </ScrollBackground>
  );
}
