import styled from 'styled-components/native';
import { View } from 'react-native';

export const ExpertiseContainer = styled(View)`
  margin-top: 15px;
  padding: ${(props) => props.theme.space[3]};
  flex: 1;
`;

export const GrowConainer = styled(View)`
  flex-grow: 1;
`;
