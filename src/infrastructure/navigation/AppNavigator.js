import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/account/slices/userSlice';
import { Text, View, Button } from 'react-native';

export default function AppNavigator() {
  const dispatch = useDispatch();
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Hello, world!</Text>
      <Button
        onPress={() => dispatch(logout())}
        title='logout'
        color='#841584'
      />
    </View>
  );
}
