import styled from 'styled-components/native';
import { Button, TextInput, ToggleButton, Divider } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import { colors } from '../../../infrastructure/theme/colors';
import { ScrollView, View, SafeAreaView, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import { getStylesForProperty } from 'css-to-react-native';

export const Feedbacklist = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;

export const SearchBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const CardContainer = styled.View`
  flex-direction: row;
  padding: ${(props) => props.theme.space[3]};
`;

export const Label = styled(TextInput)`
  width: 200px;
`;
export const SearchCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const RSPCard = styled(Card)`
  background-color: white;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const RSPCardCover = styled(Card.Cover)`
  padding: 20px;
  background-color: white;
`;

export const Info = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
  text-transform: capitalize;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const SmallSpace = styled.View`
  padding-left: 16px;
`;
export const InfoContainer = styled.View``;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Address = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const SearchContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  border: solid 2px black;
  margin-right: 5px;
  margin-left: 5px;
`;

export const MenuContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const SmallAuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  margin-vertical: 2px;
  margin-horizontal: 5px;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const LargeAuthInput = styled(TextInput)`
  width: 300px;
  height: 200px;
  text-align: left;
`;
export const SmallAuthInput = styled(TextInput)`
  width: 180px;
`;

export const Title = styled(Text)`
  font-size: 30px;
  text-transform: capitalize;
`;

export const SmallTitle = styled(Text)`
  padding: 16px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const TypeButton = styled(ToggleButton)`
  width: auto;
  height: auto;
`;

export const ExpertiseContainer = styled(View)`
  margin-top: 15px;
  padding: ${(props) => props.theme.space[3]};
  flex: 1;
`;
export const FeedbackView = styled(View)`
  padding: ${(props) => props.theme.space[4]};
  flex: 1;
  margin-vertical: 8px;
  margin-horizontal: 8px;
`;

export const GrowContainer = styled(View)`
  flex-grow: 1;
`;

export const RegisterMultiSelect = styled(MultiSelect).attrs({
  tagRemoveIconColor: colors.text.primary,
  tagBorderColor: colors.text.primary,
  tagTextColor: colors.text.primary,
  selectedItemTextColor: colors.text.primary,
  selectedItemIconColor: colors.text.primary,
  itemTextColor: colors.text.secondary,
  submitButtonColor: colors.brand.primary,
  textColor: colors.text.primary,
  fontSize: 20,
  itemFontSize: 20,
  searchInputStyle: {
    color: colors.text.primary,
    borderRadius: 5,
    fontSize: 20,
  },
  styleInputGroup: {
    height: 64,
  },
  styleDropdownMenuSubsection: {
    borderRadius: 5,
    height: 64,
    marginBottom: 15,
  },
})``;

export const ScrollBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SafeScrollView = styled(ScrollView)``;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

export const RSPListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]}
  background-color: blue;
`;

export const PastAppointmentsFlatList = styled(FlatList).attrs((props) => ({
  contentContainerStyle: getStylesForProperty('padding', props.theme.space[3]),
}))``;

export const RSPAvatarContainer = styled.View`
  margin-right: ${(props) => props.theme.space[2]};
  padding: 0;
`;

export const BottomViewButton = styled.View`
  flex: 1;
  padding: 7px;
  align-items: center;
`;

export const AbortButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  position: absolute;
  bottom: 35px;
`;

export const BlackDivider = styled(Divider)`
  color: black;
  height: 2px;
`;
