import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './AccountNavigator';
import AppNavigator from './AppNavigator';
import { isLoggedIn } from '../../features/account/slices/userSlice';

export default function Navigation() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuthenticated !== null &&
        (isAuthenticated ? <AppNavigator /> : <AccountNavigator />)}
    </NavigationContainer>
  );
}
