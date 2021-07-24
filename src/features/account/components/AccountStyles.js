import styled from 'styled-components/native';
import { Button, TextInput, ToggleButton } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import { colors } from '../../../infrastructure/theme/colors';

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg1.jpg'),
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

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
  border: solid 2px black;
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

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const TypeButton = styled(ToggleButton)`
  width: auto;
  height: auto;
`;
