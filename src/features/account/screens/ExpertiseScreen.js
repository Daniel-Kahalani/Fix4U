import React, { useState } from 'react';
import { expertiseArr } from '../../../infrastructure/constants';
import Spacer from '../../../components/utils/Spacer';
import { AccountCover, AuthButton } from '../components/AccountStyles';
import {
  ExpertiseContainer,
  ScrollBackground,
  GrowConainer,
  RegisterMultiSelect,
} from '../components/RegisterStyles';

export default function ExpertiseScreen({ navigation, route }) {
  const [expertise, setExpertise] = useState([]);

  return (
    <ScrollBackground>
      <AccountCover />
      <ExpertiseContainer>
        <RegisterMultiSelect
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
        <GrowConainer />
        <Spacer size='large'>
          <AuthButton
            mode='contained'
            onPress={() =>
              navigation.navigate('PersonalInfo', {
                expertise,
                ...route.params,
              })
            }
          >
            Next
          </AuthButton>
        </Spacer>
      </ExpertiseContainer>
    </ScrollBackground>
  );
}
