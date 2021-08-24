import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

export const NotificationDetailsContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const ListIcon = styled(Avatar.Icon)`
  background-color: ${(props) => props.theme.colors.brand.primary};
`;
