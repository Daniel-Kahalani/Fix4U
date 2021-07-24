import React from 'react';
import { Appbar as Bar } from 'react-native-paper';

export default function AppBar({ scene, navigation, previous }) {
  return scene.route.name === 'Main' ? null : (
    <Bar.Header>
      {previous ? <Bar.BackAction onPress={navigation.goBack} /> : null}
      <Bar.Content title='Fix4U' />
    </Bar.Header>
  );
}
