import styled from 'styled-components';

const ChannelWrapper = styled.div`
  z-index: 3;
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #1b1c1d;
  color: #958993;
  width: 250px;
`;

const HeaderChannelList = styled.div`
  position: tiny;
  top: 0;
  background-color: #4d4d4d;
  z-index: 1;
  height: 50px;
  margin-bottom: 1.2em;
  width: 264px;
`;

const SidebarTitle = styled.h3`
  text-align: left;
  margin-bottom: 1.5em;
  margin-left: 1em;
`;

const ButtonClose = styled.button`
  background-color: #1b1c1d;
  border: none;
  margin-left: 16em;
  margin-top: 0.5em;
`;

export { ChannelWrapper, HeaderChannelList, SidebarTitle, ButtonClose };
