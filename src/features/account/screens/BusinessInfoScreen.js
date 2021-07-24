import React from 'react';
import RSPForm from '../components/RSPForm';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  Title,
} from '../components/AccountStyles';

export default function BusinessInfoScreen({ navigation, route }) {
  const handleNext = (businessInfo) => {
    navigation.navigate('Expertise', { ...route.params, ...businessInfo });
  };

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Business Information</Title>
      <AccountContainer>
        <RSPForm goToPersonalInfoScreen={handleNext} />
      </AccountContainer>
    </AccountBackground>
  );
}
