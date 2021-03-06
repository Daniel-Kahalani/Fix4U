import styled from 'styled-components/native';
import { getStylesForProperty } from 'css-to-react-native';
import { FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import Text from '../../../components/utils/Text';

export const InboxContainer = styled.View`
  flex: 1;
`;

export const InboxBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
`;

export const InboxCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
`;

export const ErrorIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const ErorIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const Title = styled(Text)`
  font-size: 25px;
  font-weight: 600;
`;

export const RefreshScrollView = styled(ScrollView)`
  height: 10%;
  max-height: 10%;
`;

export const AnimationContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 60%;
  position: absolute;
  top: 10%;
  padding: ${(props) => props.theme.space[2]};
`;

export const AnimationMsg = styled(Text)`
  font-size: 25px;
  font-weight: 600;
`;

export const MsgContainer = styled.View`
  position: absolute;
  top: 55%;
  padding: ${(props) => props.theme.space[2]};
`;

export const NotificationsFlatList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;
