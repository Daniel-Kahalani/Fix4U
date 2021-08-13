import React from 'react';
import { ScrollView } from 'react-native';
import EditBusinessInfoForm from '../components/EditBusinessInfoForm';
import {
  ScrollBackground,
  SettingCover,
  EditContainer,
  Title,
  FormContainer,
} from '../styles/settingStyles';

export default function EditBusinessInfoScreen({ navigation }) {
  const handleNext = (businessInfo) => {
    navigation.navigate('EditExpertise', businessInfo);
  };

  return (
    <ScrollBackground>
      <SettingCover />
      <ScrollView>
        <EditContainer>
          <Title>Business Information</Title>
          <FormContainer>
            <EditBusinessInfoForm goToNextScreen={handleNext} />
          </FormContainer>
        </EditContainer>
      </ScrollView>
    </ScrollBackground>
  );
}
