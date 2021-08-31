import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
`;

export const ModalBody = styled.View`
  background-color: #fff;
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

export const ModalTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding: 5px;
  color: #000;
`;

export const ButtonsSection = styled.View`
  flex-direction: row;
  padding: 15px;
  margin: 10%;
`;

export const NoButton = styled.TouchableOpacity`
  background-color: #db2828;
  border-radius: 10px;
  margin-horizontal: 25px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

export const YesButton = styled.TouchableOpacity`
  background-color: #21ba45;
  border-radius: 10px;
  margin-horizontal: 25px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
