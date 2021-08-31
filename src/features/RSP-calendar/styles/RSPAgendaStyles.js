import styled from 'styled-components';

export const EmptyDateContainer = styled.View`
  align-items: center;
  margin: 5%;
  border-top-width: 2px;
  border-top-color: #dddddd;
  padding: 15px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
