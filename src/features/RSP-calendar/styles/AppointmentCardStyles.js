import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

export const AppointmentCardContainer = styled.View`
  flex-direction: row-reverse;
  justify-content: flex-start;
  margin-bottom: 5%;
  border-top-width: 2px;
  border-top-color: #dddddd;
  padding: 15px;
`;

export const AvatarContainer = styled.View`
  flex: 3;
  flex-direction: column;
  flex-wrap: wrap;
  width: 60%;
  height: 60%;
  margin: 3%;
`;

export const ButtonsSection = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const AppointmentInfoCard = styled(Card)`
  flex: 3;
  flex-direction: row-reverse;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  width: 70%;
  margin-right: 10%;
`;

export const AppointmentInfoCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
`;

export const Info = styled.View`
  align-items: flex-start;
  padding: ${(props) => props.theme.space[3]};
`;

export const Time = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.monospace};
  font-size: ${(props) => props.theme.fontSizes.body};
`;

export const Description = styled.View`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
