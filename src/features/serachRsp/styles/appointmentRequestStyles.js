import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import { colors } from '../../../infrastructure/theme/colors';
import { View } from 'react-native';

export const ScrollBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
`;

export const FeedbackCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const FeedbackContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.View`
  background-color: rgba(233, 236, 239, 0.7);
  border-radius: 15px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const SubmitButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const FeedbackInput = styled(TextInput)`
  width: 300px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
