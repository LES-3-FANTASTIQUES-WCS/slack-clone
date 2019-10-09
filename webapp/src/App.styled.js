import styled from 'styled-components';
import { widescreenMinimumWidth } from './style-constants';

const AppWrapper = styled.div`
  display: grid;

  @media screen and (min-width: ${widescreenMinimumWidth}px) {
    height: 100vh;
    grid-template-columns: 128px auto;
  }
`;

export { AppWrapper };
