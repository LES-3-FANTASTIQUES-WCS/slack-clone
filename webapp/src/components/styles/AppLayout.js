import styled from 'styled-components';

export default styled.div`
  @media screen and (min-width: 768px) {
    grid-template-columns: 250px 1fr;
  }
  display: grid;
  height: 100vh;
  grid-template-column: auto;
  grid-template-rows: auto 1fr auto;
`;
