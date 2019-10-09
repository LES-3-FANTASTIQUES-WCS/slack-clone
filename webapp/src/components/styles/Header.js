import styled from 'styled-components';

const HeaderWrapper = styled.div`
  @media screen and (min-width: 768px) {
    grid-column: 2;
  }
  grid-column: 1;
  grid-row: 1;
  width: auto;
`;

const ToggleBtnStyle = styled.div`
  padding: 1rem;
`;

const LogUserStyle = styled.div`
  padding: 1rem;
`;

const ChannelStyle = styled.div`
  padding-top: 0.3rem;
`;

export { HeaderWrapper, ToggleBtnStyle, LogUserStyle, ChannelStyle };
