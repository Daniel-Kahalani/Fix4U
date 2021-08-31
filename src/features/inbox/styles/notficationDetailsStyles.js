import styled from 'styled-components/native';

export const NotificationDetailsContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const NotificationDetailsBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
`;

export const NotificationDetailsCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
`;
