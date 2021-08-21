import styled from 'styled-components/native';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { FlatList } from 'react-native';
import { getStylesForProperty } from 'css-to-react-native';

export const RestaurantList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
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
