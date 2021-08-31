import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';
import { Card, Avatar, Button, List } from 'react-native-paper';
import Text from '../../../components/utils/Text';

export const NotificationCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;
export const CardContainer = styled.View`
  flex-direction: row;
  padding: ${(props) => props.theme.space[3]};
`;

export const NotificationAvatarContainer = styled.View`
  margin-right: ${(props) => props.theme.space[2]};
`;

export const NotificationIcon = styled(Avatar.Icon).attrs({
  size: 46,
})`
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const InfoContainer = styled.View``;

export const Info = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
  text-transform: capitalize;
`;

export const Title = styled(Text)`
  text-transform: capitalize;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const CapitalizeListItem = styled(List.Item).attrs({
  descriptionStyle: { textTransform: 'capitalize' },
})``;

export const CardActions = styled(Card.Actions)`
  flex: 1;
  justify-content: center;
  align-items: center;
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
