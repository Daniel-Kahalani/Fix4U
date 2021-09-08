import styled from 'styled-components/native';
import { getStylesForProperty } from 'css-to-react-native';
import { FlatList, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import Text from '../../../components/utils/Text';

export const SearchResultContainer = styled.View`
  flex: 1;
`;

export const SearchResultBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
`;

export const SearchResultCover = styled.View`
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
export const ErrorIcon = styled(Avatar.Icon).attrs({
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
  height: 50%;
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

export const SearchResultFlatList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;

export const RSPText = styled(Avatar.Text).attrs({
  size: 46,
  labelStyle: { textTransform: 'capitalize' },
})`
  background-color: ${(props) => props.theme.colors.brand.primary};
`;
