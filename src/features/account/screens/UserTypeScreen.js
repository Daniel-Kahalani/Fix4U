import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../slices/userSlice';
import { ToggleButton } from 'react-native-paper';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  Title,
} from '../components/AccountStyles';
import {
  OptionButton,
  OptionIconButton,
  OptionLabel,
  OptionDivider,
} from '../components/RegisterStyles';
import { UserType } from '../../../infrastructure/constants';

export default function UserTypeScreen({ navigation }) {
  const [userType, setUserType] = useState(UserType.CUSTOMER);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Who Are You</Title>
      <AccountContainer>
        <ToggleButton.Group
          onValueChange={(value) => setUserType(value)}
          value={userType}
        >
          <OptionButton
            icon={() => (
              <>
                <OptionIconButton icon='toolbox' size={170} />
                <OptionLabel>Business</OptionLabel>
              </>
            )}
            onPress={() =>
              navigation.navigate('BusinessInfo', { userType: UserType.RSP })
            }
            value={UserType.RSP}
            size={150}
          />
          <OptionDivider />
          <OptionButton
            icon={() => (
              <>
                <OptionIconButton icon='account' size={170} />
                <OptionLabel>Person</OptionLabel>
              </>
            )}
            onPress={() =>
              navigation.navigate('PersonalInfo', {
                userType: UserType.CUSTOMER,
              })
            }
            value={UserType.CUSTOMER}
            size={150}
          />
        </ToggleButton.Group>
      </AccountContainer>
    </AccountBackground>
  );
}
