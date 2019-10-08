import styled from 'styled-components';

const AppWrapper = styled.div`
  display: grid;

  @media screen and (min-width: 768px) {
    height: 100vh;
    grid-template-columns: 128px auto;
  }
`;

export { AppWrapper };
