import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import Text from '../../../components/utils/Text';
import { colors } from '../../../infrastructure/theme/colors';
import { ScrollView, SafeAreaView } from 'react-native';

export const Label = styled(TextInput)`
  width: 150px;
`;
export const Cover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const Section = styled.View`
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
  border: solid 2px black;
  margin-right: 5px;
  margin-left: 5px;
  height: 87%;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[1]};
`;

export const AuthInput = styled(TextInput)`
  width: 100%;
`;

export const Title = styled(Text)`
  font-size: 30px;
  text-align: center;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const BackgroundImage = styled.ImageBackground.attrs({
  source: require('../../../../assets/backgrounds/main.jpeg'),
})`
  flex: 1;
`;

export const SafeScrollView = styled(ScrollView)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 60%;
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

export const BackButtonContainer = styled.View`
  background-color: white;
  border-radius: 15px;
  position: absolute;
  top: 70%;
  padding: ${(props) => props.theme.space[1]};
`;
export const AnimationContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
