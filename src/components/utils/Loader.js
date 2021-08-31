import styled from 'styled-components/native';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default styled(ActivityIndicator).attrs({
  animating: true,
  color: Colors.blue300,
  size: 40,
})``;
