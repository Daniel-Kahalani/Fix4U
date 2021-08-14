import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../slices/userSlice';
import { UserType } from '../../../infrastructure/constants';
import { ScrollView } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import { AccountCover, FormContainer, Title } from '../styles/accountStyles';
import {
  OptionButton,
  OptionIconButton,
  OptionLabel,
  OptionDivider,
  ScrollBackground,
  RegisterContainer,
} from '../styles/registerStyles';

export default function UserTypeScreen({ navigation }) {
  const [userType, setUserType] = useState(UserType.CUSTOMER);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <ScrollBackground>
      <AccountCover />
      <ScrollView>
        <RegisterContainer>
          <Title>Who Are You ?</Title>
          <Spacer size='large' />
          <FormContainer>
            <ToggleButton.Group
              onValueChange={(value) => setUserType(value)}
              value={userType}
            >
              <OptionButton
                icon={() => (
                  <>
                    <OptionIconButton icon='toolbox' size={130} />
                    <OptionLabel>Business</OptionLabel>
                  </>
                )}
                onPress={() =>
                  navigation.navigate('BusinessInfo', {
                    userType: UserType.RSP,
                  })
                }
                value={UserType.RSP}
                size={130}
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
          </FormContainer>
        </RegisterContainer>
      </ScrollView>
    </ScrollBackground>
  );
}
