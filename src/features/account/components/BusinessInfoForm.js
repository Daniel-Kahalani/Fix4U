import React, { useState } from 'react';
import { HelperText } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import { AuthInput, AuthButton } from '../styles/accountStyles';

export default function BusinessInfoForm({ goToPersonalInfoScreen }) {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [visitCost, setVisitCost] = useState('');
  const [errorCheck, setErrorCheck] = useState(false);

  const hasVisitCostErrors = () => {
    const num = parseInt(visitCost, 10);
    return isNaN(num) || num <= 0 ? true : false;
  };

  const hasInputErrors = () => {
    return !businessName || !businessAddress || hasVisitCostErrors();
  };

  const handleNext = () => {
    setErrorCheck(true);
    if (!hasInputErrors()) {
      goToPersonalInfoScreen({
        businessName,
        businessAddress,
        visitCost,
      });
    }
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
        <HelperText type='error' visible={errorCheck && !businessName}>
          Business name is invalid!
        </HelperText>
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
        <HelperText type='error' visible={errorCheck && !businessAddress}>
          Business address is invalid!
        </HelperText>
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
        <HelperText type='error' visible={errorCheck && hasVisitCostErrors()}>
          Visit Cost is invalid!(a positive integer Number)
        </HelperText>
      </Spacer>
      <Spacer size='large'>
        <AuthButton mode='contained' onPress={handleNext}>
          Next
        </AuthButton>
      </Spacer>
    </>
  );
}
