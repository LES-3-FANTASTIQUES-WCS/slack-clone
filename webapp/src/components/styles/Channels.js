import styled from 'styled-components';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const HeaderChannelList = styled.div`
  position: '-webkit-sticky';
  position: 'sticky';
  top: '0';
  backgroundcolor: '#1b1c1d';
  zindex: 1;
  height: '50px';
`;

export { ChannelWrapper, HeaderChannelList };
