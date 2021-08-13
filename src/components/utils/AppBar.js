import React from 'react';
import { Appbar as Bar } from 'react-native-paper';

export default function AppBar({ scene, navigation, previous, ...data }) {
  const noAppbarScreens = ['Main', 'EditSuccess'];
  return noAppbarScreens.includes(scene.route.name) ? null : (
    <Bar.Header>
      {previous ? <Bar.BackAction onPress={navigation.goBack} /> : null}
      <Bar.Content title={scene.descriptor.options.title} />
    </Bar.Header>
  );
}
