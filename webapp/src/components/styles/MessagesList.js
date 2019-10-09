import styled from 'styled-components';

const MessageWrapper = styled.div`
  @media screen and (min-width: 768px) {
    grid-column: 2;
  }
  grid-column: 1;
  grid-row: 2;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

export { MessageWrapper };
