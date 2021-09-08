import styled from 'styled-components/native';
import Text from '../../../components/utils/Text';

export const GradeContainer = styled.View.attrs({})`
  justify-content: center;
  align-items: center;
  border-radius: 65px;
  border-width: 10px;
  border-color: ${({ color }) => color};
  height: 130px;
  width: 130px;
  align-self: center;
  margin: 10px;
`;

export const Title = styled(Text)`
  font-size: 35px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.secondary};
`;
