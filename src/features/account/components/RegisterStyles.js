import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { ToggleButton, IconButton, Divider } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import Text from '../../../components/utils/Text';
import { colors } from '../../../infrastructure/theme/colors';

export const OptionButton = styled(ToggleButton)`
  width: auto;
  height: auto;
  border-radius: 15px;
`;

export const OptionIconButton = styled(IconButton)`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0px;
  border-radius: 15px;
`;

export const OptionLabel = styled(Text)`
  font-size: 30px;
  margin: 0;
  padding: 0;
  align-self: center;
`;

export const OptionDivider = styled(Divider)`
  background-color: black;
  height: 2px;
`;

export const ExpertiseContainer = styled(View)`
  margin-top: 15px;
  padding: ${(props) => props.theme.space[3]};
  flex: 1;
`;

export const GrowConainer = styled(View)`
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
  source: require('../../../../assets/home_bg1.jpg'),
})`
  flex: 1;
`;

export const SafeScrollView = styled(ScrollView)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const PresonalInfoContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
