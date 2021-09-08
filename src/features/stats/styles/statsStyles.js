import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';
import {
  BarChart as NativeBarChart,
  PieChart as NativePieChart,
} from 'react-native-chart-kit';
import { ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import Text from '../../../components/utils/Text';

export const ScrollBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
`;

export const StatsCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const RefreshMiniScrollView = styled(ScrollView)`
  height: 10%;
  max-height: 10%;
`;

export const ErrorContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const ErorIcon = styled(Avatar.Icon).attrs({
  bg: colors.ui.error,
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const ErrorTitle = styled(Text)`
  font-size: 25px;
  font-weight: 600;
`;

export const StatsContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  justify-content: center;
`;

export const ChartsContainer = styled.View`
  background-color: rgba(233, 236, 239, 0.7);
  border-radius: 15px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;
export const Title = styled(Text)`
  margin-vertical: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 100;
`;

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0,
  fillShadowGradientOpacity: 0.6,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export const BarChart = styled(NativeBarChart).attrs({
  chartConfig: chartConfig,
  height: 220,
  fromZero: true,
  showValuesOnTopOfBars: true,
})`
  margin-vertical: 8px;
`;

export const PieChart = styled(NativePieChart).attrs({
  chartConfig: chartConfig,
  height: 220,
})`
  margin-vertical: 8px;
`;
