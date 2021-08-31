import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #7eb3ff;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
`;

export const ModalHeader = styled.View``;

export const ModalBody = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

export const ModalTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding: 15px;
  color: #00f;
`;

export const Section = styled.View`
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

export const DiscardButton = styled.TouchableOpacity`
  background-color: #db2828;
  border-radius: 10px;
  margin-horizontal: 25px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #21ba45;
  border-radius: 10px;
  margin-horizontal: 25px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const ChooseButton = styled.TouchableOpacity`
  background-color: #21ba45;
  border-radius: 10px;
  margin-horizontal: 15px;
  padding-vertical: 5px;
  padding-horizontal: 5px;
`;

export const Label = styled(TextInput)`
  width: 200px;
`;
