import React from 'react';
import { Appbar } from 'react-native-paper';
import styled from 'styled-components/native';

const AppbarHeader = styled(Appbar.Header)`
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export default function AppBar({ scene, navigation, previous, ...data }) {
  const noAppbarScreens = ['Main', 'EditSuccess'];
  return noAppbarScreens.includes(scene.route.name) ? null : (
    <AppbarHeader statusBarHeight={15}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={scene.descriptor.options.title} />
    </AppbarHeader>
  );
}
