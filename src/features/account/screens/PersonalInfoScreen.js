import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../slices/userSlice';
import UserForm from '../components/UserForm';
import {
  AccountCover,
  AccountContainer,
  Title,
} from '../components/AccountStyles';
import {
  SafeScrollView,
  ScrollBackground,
  PresonalInfoContainer,
} from '../components/RegisterStyles';

export default function PersonalInfoScreen({ route }) {
  const dispatch = useDispatch();

  const registerNewUser = (personalInfo) => {
    dispatch(register({ ...personalInfo, ...route.params }));
  };

  return (
    <ScrollBackground>
      <AccountCover />
      <SafeScrollView>
        <PresonalInfoContainer>
          <Title>Personal Information</Title>
          <AccountContainer>
            <UserForm
              userType={route.params.userType}
              handleRegister={registerNewUser}
            />
          </AccountContainer>
        </PresonalInfoContainer>
      </SafeScrollView>
    </ScrollBackground>
  );
}
