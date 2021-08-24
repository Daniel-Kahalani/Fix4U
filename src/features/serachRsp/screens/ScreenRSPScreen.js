import React, { useEffect, useRef } from 'react';
import Spacer from '../../../components/utils/Spacer';
import {
  SearchBackground,
  SearchCover,
  Title,
  MenuContainer,
  AuthButton,
} from '../components/SearchStyles';

export default function ScreenRSPScreen({ navigation }) {
  return (
    <SearchBackground>
      <SearchCover />
      <Title>Search RSP</Title>
      <MenuContainer>
        <AuthButton
          icon='account-clock'
          mode='contained'
          onPress={() => navigation.navigate('SearchByAvailability')}
        >
          Search by availability
        </AuthButton>
        <Spacer size='large'>
          <AuthButton
            icon='account-search'
            mode='contained'
            onPress={() => navigation.navigate('SearchByNameScreen')}
          >
            Search by name
          </AuthButton>
        </Spacer>
      </MenuContainer>
    </SearchBackground>
  );
}
