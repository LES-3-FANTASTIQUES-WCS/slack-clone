import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ChannelList = styled.ul`
  list-style-type: none;
  background-color: rgb(53, 13, 54);
  margin: 0;
  padding-left: 0;
  padding-top: 20px;
  text-align: center;
`;

const LinkToChannel = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &::before {
    content: '# ';
  }
`;

export { ChannelList, LinkToChannel };
