import styled from 'styled-components/native';
import { theme } from '../../infrastructure/theme';
import { SnackBarType } from '../../infrastructure/utils/constants';
import { Snackbar } from 'react-native-paper';

export default styled(Snackbar).attrs({
  duration: 7000,
  theme: { colors: { accent: 'white', ...theme.colors } },
})`
  background-color: ${(props) =>
    props.type === SnackBarType.SUCCESS
      ? props.theme.colors.ui.success
      : props.theme.colors.ui.error};
`;
