import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';
import {
  AuthInput,
  ErrorContainer,
  AuthButton,
} from '../components/AccountStyles';
import { UserType } from '../../../infrastructure/constants';

export default function UserForm({ userType, handleRegister }) {
  const { error, loading } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <>
      <AuthInput
        label='Full Name'
        value={fullName}
        textContentType='name'
        keyboardType='default'
        autoCapitalize='none'
        onChangeText={(u) => setFullName(u)}
      />
      <Spacer size='large'>
        <AuthInput
          label='E-mail'
          value={email}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(u) => setEmail(u)}
        />
      </Spacer>
      <Spacer size='large'>
        <AuthInput
          label='Password'
          value={password}
          textContentType='password'
          secureTextEntry
          autoCapitalize='none'
          onChangeText={(p) => setPassword(p)}
        />
      </Spacer>
      <Spacer size='large'>
        <AuthInput
          label='Repeat Password'
          value={repeatedPassword}
          textContentType='password'
          secureTextEntry
          autoCapitalize='none'
          onChangeText={(p) => setRepeatedPassword(p)}
        />
      </Spacer>
      <Spacer size='large'>
        <AuthInput
          label='Phone'
          value={phone}
          textContentType='telephoneNumber'
          keyboardType='phone-pad'
          autoCapitalize='none'
          onChangeText={(u) => setPhone(u)}
        />
      </Spacer>
      {userType === UserType.CUSTOMER && (
        <Spacer size='large'>
          <AuthInput
            label='Home Address'
            value={address}
            textContentType='none'
            keyboardType='default'
            autoCapitalize='none'
            onChangeText={(u) => setAddress(u)}
          />
        </Spacer>
      )}
      {error && (
        <ErrorContainer size='large'>
          <Text variant='error'>{error}</Text>
        </ErrorContainer>
      )}
      <Spacer size='large'>
        {!loading ? (
          <AuthButton
            icon='email'
            mode='contained'
            onPress={() =>
              handleRegister({
                fullName,
                email,
                password,
                repeatedPassword,
                address,
                phone,
              })
            }
          >
            Register
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </>
  );
}
