import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../../../infrastructure/utils/constants';
import { ActivityIndicator, Colors, HelperText } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';
import { AuthInput, ErrorContainer, AuthButton } from '../styles/settingStyles';

export default function EditPersonalProfileForm({ handleUpdate }) {
  const { info, error, loading } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(info.fullName);
  const [email, setEmail] = useState(info.email);
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [phone, setPhone] = useState(info.phone);
  const [address, setAddress] = useState(info.address);

  const [errorCheck, setErrorCheck] = useState(false);
  const isCustomer = info.userType === UserType.CUSTOMER ? true : false;

  const hasEmailErrors = () => {
    return !email.includes('@');
  };
  const hasPasswordErrors = () => {
    return password.length > 0 && password.length < 6;
  };
  const hasRepeatedPasswordErrors = () => {
    return password !== repeatedPassword;
  };

  const hasInputErrors = () => {
    return (
      !fullName ||
      hasEmailErrors() ||
      hasPasswordErrors() ||
      hasRepeatedPasswordErrors() ||
      !phone ||
      (isCustomer && !address)
    );
  };

  const handleUpdateButtonClick = () => {
    setErrorCheck(true);
    if (!hasInputErrors()) {
      handleUpdate({
        fullName,
        email,
        password,
        address,
        phone,
      });
    }
  };

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
      <HelperText type='error' visible={errorCheck && !fullName}>
        Full name is invalid!
      </HelperText>
      <Spacer size='large'>
        <AuthInput
          label='E-mail'
          value={email}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(u) => setEmail(u)}
        />
        <HelperText type='error' visible={errorCheck && hasEmailErrors()}>
          Email address is invalid!
        </HelperText>
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
        <HelperText type='error' visible={errorCheck && hasPasswordErrors()}>
          Password is invalid!(at least 6 letters)
        </HelperText>
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
        <HelperText
          type='error'
          visible={errorCheck && hasRepeatedPasswordErrors()}
        >
          Passwords do not match
        </HelperText>
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
        <HelperText type='error' visible={errorCheck && !phone}>
          Phone number is invalid!
        </HelperText>
      </Spacer>
      {isCustomer && (
        <Spacer size='large'>
          <AuthInput
            label='Home Address'
            value={address}
            textContentType='none'
            keyboardType='default'
            autoCapitalize='none'
            onChangeText={(u) => setAddress(u)}
          />
          <HelperText type='error' visible={errorCheck && !address}>
            Home address is invalid!
          </HelperText>
        </Spacer>
      )}
      {error && (
        <ErrorContainer size='large'>
          <Text variant='error'>{error.message}</Text>
        </ErrorContainer>
      )}
      <Spacer size='large'>
        {!loading ? (
          <AuthButton
            icon='email'
            mode='contained'
            onPress={handleUpdateButtonClick}
          >
            Update
          </AuthButton>
        ) : (
          <ActivityIndicator
            animating={true}
            color={Colors.blue300}
            size='large'
          />
        )}
      </Spacer>
    </>
  );
}
