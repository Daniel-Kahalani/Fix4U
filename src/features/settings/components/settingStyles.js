import styled from 'styled-components/native';
import SafeArea from '../../../components/utils/SafeArea';
import { List } from 'react-native-paper';

export const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;
export const AvatarContainer = styled.View`
  align-items: center;
`;

export const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;
export const SettingsBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg1.jpg'),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;
