import styled from 'styled-components/native';
import { View } from 'react-native';
import { ToggleButton, IconButton, Divider } from 'react-native-paper';
import Text from '../../../components/utils/Text';

export const OptionButton = styled(ToggleButton)`
  width: auto;
  height: auto;
  border-radius: 15px;
`;

export const OptionIconButton = styled(IconButton)`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0px;
  border-radius: 15px;
`;

export const OptionLabel = styled(Text)`
  font-size: 30px;
  margin: 0;
  padding: 0;
  align-self: center;
`;

export const OptionDivider = styled(Divider)`
  background-color: black;
  height: 2px;
`;

export const ExpertiseContainer = styled(View)`
  margin-top: 15px;
  padding: ${(props) => props.theme.space[3]};
  flex: 1;
`;

export const GrowConainer = styled(View)`
  flex-grow: 1;
`;

export const ScrollBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/home.jpg'),
})`
  flex: 1;
`;

export const RegisterContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
