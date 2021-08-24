import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../slices/userSlice';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import {
  AccountBackground,
  AccountCover,
  FormContainer,
  AuthInput,
  ErrorContainer,
  AuthButton,
} from '../styles/accountStyles.js';
import { AnimationWrapper } from '../styles/loginStyles';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key='animation'
          autoPlay
          loop
          source={require('../../../../assets/animations/login.json')}
        />
      </AnimationWrapper>
      <FormContainer>
        <AuthInput
          label='E-mail'
          value={email}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(u) => setEmail(u)}
        />
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
        {error && (
          <ErrorContainer size='large'>
            <Text variant='error'>{error.message}</Text>
          </ErrorContainer>
        )}
        <Spacer size='large'>
          {!loading ? (
            <AuthButton
              icon='lock-open-outline'
              mode='contained'
              onPress={() => dispatch(login({ email, password }))}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator
              animating={true}
              color={Colors.blue300}
              size='large'
            />
          )}
        </Spacer>
      </FormContainer>
    </AccountBackground>
  );
}
