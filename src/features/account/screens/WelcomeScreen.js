import React from 'react';
import Spacer from '../../../components/utils/Spacer';
import {
  AccountBackground,
  MenuContainer,
  AccountCover,
  AuthButton,
  Title,
} from '../components/AccountStyles';

export default function WelcomeScreen({ navigation }) {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Fix 4 U</Title>
      <MenuContainer>
        <AuthButton
          icon='lock-open-outline'
          mode='contained'
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <Spacer size='large'>
          <AuthButton
            icon='email'
            mode='contained'
            onPress={() => navigation.navigate('UserType')}
          >
            Register
          </AuthButton>
        </Spacer>
      </MenuContainer>
    </AccountBackground>
  );
}
