import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import { colors } from '../../../infrastructure/theme/colors';
import { Animated } from 'react-native';

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/home.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const AnimatedView = styled(Animated.View)`
  width: 100%;
  height: 40%;
  position: absolute;
  top: ${0};
  padding: ${(props) => props.theme.space[2]};
`;

export const Title = styled(Text)`
  font-size: 35px;
  font-weight: 700;
`;

export const MenuContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const FormContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
