import styled from 'styled-components';
import { secondaryBackgroundColor } from '../../style-constants';

import { Button } from '../../common.styled';

const Burger = styled(Button)``;

const BurgerWrapper = styled.div`
  background-color: ${secondaryBackgroundColor};
  height: 50px;
`;

export { Burger, BurgerWrapper };
