import styled from 'styled-components/native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { FlatList, ScrollView } from 'react-native';
import { getStylesForProperty } from 'css-to-react-native';
import { Card } from 'react-native-paper';
import { colors } from '../../../infrastructure/theme/colors';
import Text from '../../../components/utils/Text';

export const InboxContainer = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
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

export const NotificationList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;

/////////////////////////////////////////////////////////////////
export const NotificationCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;
export const CardContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${(props) => props.theme.space[3]};
`;

export const NotificationIconContainer = styled.View`
  margin-right: ${(props) => props.theme.space[2]};
`;

export const InfoContainer = styled.View``;

export const Info = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const NotificationIcon = styled(Avatar.Icon).attrs({
  size: 46,
})`
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const CardActions = styled(Card.Actions)`
  flex: 1;
  padding: 0;
`;

export const AcceptButton = styled(Button).attrs({
  color: colors.ui.success,
})`
  flex-grow: 1;
  padding: ${(props) => props.theme.space[2]};
`;

export const DeclineButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  flex-grow: 1;
  padding: ${(props) => props.theme.space[2]};
`;

/////////////////////

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

export const RefreshScrollView = styled(ScrollView)`
  height: 10%;
  max-height: 10%;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
