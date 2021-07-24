import React, { useState } from 'react';
import { AuthInput, AuthButton } from '../components/AccountStyles';
import Spacer from '../../../components/utils/Spacer';

export default function RSPForm({ goToPersonalInfoScreen }) {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [visitCost, setVisitCost] = useState('');

  const handleNext = () => {
    goToPersonalInfoScreen({
      businessName,
      businessAddress,
      visitCost,
    });
  };

  return (
    <>
      <Spacer size='large'>
        <AuthInput
          label='Business Name'
          value={businessName}
          textContentType='organizationName'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(u) => setBusinessName(u)}
        />
      </Spacer>
      <Spacer size='large'>
        <AuthInput
          label='Business Address'
          value={businessAddress}
          textContentType='none'
          keyboardType='default'
          autoCapitalize='none'
          onChangeText={(u) => setBusinessAddress(u)}
        />
      </Spacer>
      <Spacer size='large'>
        <AuthInput
          label='Visit Cost'
          value={visitCost}
          textContentType='none'
          keyboardType='decimal-pad'
          autoCapitalize='none'
          onChangeText={(u) => setVisitCost(u)}
        />
      </Spacer>
      <Spacer size='large'>
        <AuthButton mode='contained' onPress={handleNext}>
          Next
        </AuthButton>
      </Spacer>
    </>
  );
}
