// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import SettingsNavigator from './SettingsNavigator';
// import { loadPhoto } from '../../features/account/slices/userSlice';
// import { colors } from '../../infrastructure/theme/colors';

// const Tab = createBottomTabNavigator();

// const TAB_ICON = {
//   Restaurants: 'md-restaurant',
//   Map: 'md-map',
//   Checkout: 'md-cart',
//   Settings: 'md-settings',
// };

// const createScreenOptions = ({ route }) => {
//   const iconName = TAB_ICON[route.name];
//   return {
//     tabBarIcon: ({ size, color }) => (
//       <Ionicons name={iconName} size={size} color={color} />
//     ),
//   };
// };

// export default function AppNavigator() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadPhoto());
//   }, [dispatch]);

//   return (
//     <Tab.Navigator
//       screenOptions={createScreenOptions}
//       tabBarOptions={{
//         activeTintColor: colors.brand.primary,
//         inactiveTintColor: colors.brand.muted,
//       }}
//     >
//       {/* <Tab.Screen name='Restaurants' component={SettingsNavigator} />
//       <Tab.Screen name='Checkout' component={SettingsNavigator} />
//       <Tab.Screen name='Map' component={SettingsNavigator} /> */}
//       <Tab.Screen name='Settings' component={SettingsNavigator} />
//     </Tab.Navigator>
//   );
// }
