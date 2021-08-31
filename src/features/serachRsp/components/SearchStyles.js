import styled from 'styled-components/native';
import { Button, TextInput, ToggleButton } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import { colors } from '../../../infrastructure/theme/colors';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';

export const SearchBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/home.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
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

export const Info = styled.View`
  padding: ${(props) => props.theme.space[1]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const SmallSpace = styled.View`
  padding-left: 16px;
`;

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
  text-align: center;
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
  source: require('../../../../assets/backgrounds/home.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SafeScrollView = styled(ScrollView)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

export const RSPListContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]}
  background-color: blue;
`;
