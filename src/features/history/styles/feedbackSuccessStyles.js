import styled from 'styled-components/native';
import Text from '../../../components/utils/Text';

export const MainContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 60%;
  position: absolute;
  top: 10%;
  padding: ${(props) => props.theme.space[2]};
`;

export const SuccessMsg = styled(Text)`
  font-size: 25px;
  font-weight: 600;
`;

export const MsgContainer = styled.View`
  position: absolute;
  top: 55%;
  padding: ${(props) => props.theme.space[2]};
`;
