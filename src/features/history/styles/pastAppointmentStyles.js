import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';
import { Card, Avatar, Button, List } from 'react-native-paper';
import Text from '../../../components/utils/Text';

export const PastAppointmentCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;
export const CardContainer = styled.View`
  flex-direction: row;
  padding: ${(props) => props.theme.space[3]};
`;

export const AppointmentAvatarContainer = styled.View`
  margin-right: ${(props) => props.theme.space[2]};
  padding: 0;
`;

export const AppoitmentText = styled(Avatar.Text).attrs({
  size: 46,
  labelStyle: { textTransform: 'capitalize' },
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

export const CapitalizeListItem = styled(List.Item).attrs({
  descriptionStyle: { textTransform: 'capitalize' },
})``;

export const CardActions = styled(Card.Actions)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FeedbackButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  flex-grow: 1;
  padding: ${(props) => props.theme.space[2]};
`;
