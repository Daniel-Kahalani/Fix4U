import React, { useState } from 'react';
import { expertiseArr } from '../../../infrastructure/constants';
import { HelperText } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import MultiSelect from '../../../components/utils/MultiSelect';

import { AccountCover, AuthButton } from '../styles/accountStyles';
import {
  ExpertiseContainer,
  ScrollBackground,
  GrowConainer,
} from '../styles/registerStyles';

export default function ExpertiseScreen({ navigation, route }) {
  const [expertise, setExpertise] = useState([]);
  const [errorCheck, setErrorCheck] = useState(false);

  const hasInputErrors = () => {
    return expertise.length === 0;
  };

  const handleNext = () => {
    setErrorCheck(true);
    if (!hasInputErrors()) {
      navigation.navigate('PersonalInfo', {
        expertise,
        ...route.params,
      });
    }
  };

  return (
    <ScrollBackground>
      <AccountCover />
      <ExpertiseContainer>
        <MultiSelect
          items={expertiseArr}
          uniqueKey='name'
          onSelectedItemsChange={(selectedItems) => setExpertise(selectedItems)}
          selectedItems={expertise}
          selectText='  Pick your expertise'
          searchInputPlaceholderText='Search Expertise...'
          displayKey='name'
          submitButtonText='Submit'
          hideSubmitButton={false}
        />
        <HelperText type='error' visible={errorCheck && expertise.length === 0}>
          Must choose at least one expertise
        </HelperText>
        <GrowConainer />
        <Spacer size='large'>
          <AuthButton mode='contained' onPress={handleNext}>
            Next
          </AuthButton>
        </Spacer>
      </ExpertiseContainer>
    </ScrollBackground>
  );
}
