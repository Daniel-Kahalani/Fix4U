import React from 'react';
import BusinessInfoForm from '../components/BusinessInfoForm';
import { ScrollView } from 'react-native';
import Spacer from '../../../components/utils/Spacer';
import { AccountCover, Title, FormContainer } from '../styles/accountStyles';
import { ScrollBackground, RegisterContainer } from '../styles/registerStyles';
export default function BusinessInfoScreen({ navigation, route }) {
  const handleNext = (businessInfo) => {
    navigation.navigate('Expertise', { ...route.params, ...businessInfo });
  };

  return (
    <ScrollBackground>
      <AccountCover />
      <ScrollView>
        <RegisterContainer>
          <Title>Business Information</Title>
          <Spacer size='large' />
          <FormContainer>
            <BusinessInfoForm goToPersonalInfoScreen={handleNext} />
          </FormContainer>
        </RegisterContainer>
      </ScrollView>
    </ScrollBackground>
  );
}
