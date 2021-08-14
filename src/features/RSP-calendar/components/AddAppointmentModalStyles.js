import styled from "styled-components/native";


export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #7EB3FF;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
`;

export const ModalHeader = styled.View`

`;

export const ModalBody = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

export const ModalTitle = styled.Text`
    font-weight: bold;
    font-size: 20px;
    padding: 15px;
    color: #00F;
`;

export const ButtonsSection = styled.View`
  flex-direction: row-reverse;
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