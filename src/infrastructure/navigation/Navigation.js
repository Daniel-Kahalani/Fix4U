import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';
import { isLoggedIn } from '../../features/account/slices/userSlice';
import { UserType } from '../constants.js';
import RSPNavigator from './RSPNavigator';
import CustomerNavigator from './CustomerNavigator';

export default function Navigation() {
  const dispatch = useDispatch();
  const { isAuthenticated, info } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuthenticated !== null &&
        (isAuthenticated ? (
          info.userType === UserType.RSP ? (
            <RSPNavigator />
          ) : (
            <CustomerNavigator />
          )
        ) : (
          <AccountNavigator />
        ))}
    </NavigationContainer>
  );
}
