import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import Spacer from '../../../components/utils/Spacer';
import {
  AccountBackground,
  AccountCover,
  AnimatedView,
  Title,
  MenuContainer,
  AuthButton,
} from '../styles/accountStyles';

export default function WelcomeScreen({ navigation }) {
  const animationRef = useRef();
  const fadeAnim = useRef(new Animated.Value(1.1)).current;

  useEffect(() => {
    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    }, 8000);
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, 3000);
  }, [fadeAnim]);

  return (
    <AccountBackground>
      <AccountCover />
      <AnimatedView style={{ opacity: fadeAnim }}>
        <LottieView
          ref={(animation) => (animationRef.current = animation)}
          key='animation'
          autoPlay
          loop
          source={require('../../../../assets/animations/mechanic.json')}
        />
      </AnimatedView>
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
