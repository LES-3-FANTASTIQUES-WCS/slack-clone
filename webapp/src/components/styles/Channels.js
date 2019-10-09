import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';

const ChannelWrapper = styled.div`
  z-index: 999999;
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #1b1c1d;
  color: #958993;
  width: 250px;
`;

const HeaderChannelList = styled.div`
  position: sticky;
  top: 0;
  background-color: #1b1c1d;
  z-index: 1;
  height: 50px;
  margin-bottom: 1.2em;
  width: 250px;
`;

const ItemChannel = styled(Menu.Item)`
  &&&:hover {
    background-color: #4d4d4d;
  }
`;

export { ChannelWrapper, HeaderChannelList, ItemChannel };
