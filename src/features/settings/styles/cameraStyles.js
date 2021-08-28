import styled from 'styled-components/native';
import { TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';

export const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

export const InnerSnap = styled(TouchableHighlight)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 5px;
  border-color: white;
  background-color: white;
  margin-bottom: 15px;
`;
