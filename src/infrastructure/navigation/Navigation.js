import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn } from '../../features/account/slices/userSlice';
import { UserType } from '../utils/constants';
import { NavigationContainer } from '@react-navigation/native';
import AccountNavigator from './common/AccountNavigator';
import RSPNavigator from './rsp/RSPNavigator';
import CustomerNavigator from './customer/CustomerNavigator';
import '../../../assets/backgrounds/home.jpg';
import '../../../assets/backgrounds/main.jpeg';


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
