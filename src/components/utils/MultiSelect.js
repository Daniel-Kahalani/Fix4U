import styled from 'styled-components/native';
import MultiSelectInput from 'react-native-multiple-select';
import { colors } from '../../infrastructure/theme/colors';

export default styled(MultiSelectInput).attrs({
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
  tagContainerStyle: {
    backgroundColor: 'rgba(233, 236, 239, 0.8)',
  },
})``;
