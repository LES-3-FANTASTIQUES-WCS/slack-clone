import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  primaryBackgroundColor,
  WidescreenMinimumWidth,
  widescreenMinimumWidth,
} from '../../style-constants';
import { Button } from '../../common.styled';

const ChannelListWrapper = styled.div`
  background-color: ${primaryBackgroundColor};
  text-align: center;
  height: 100vh;
  position: fixed;
  width: ${props => (props.isOpen ? '80%' : '0%')};
  overflow: hidden;
  transition: 0.1s width ease-in-out;

  @media screen and (min-width: ${widescreenMinimumWidth}) {
    position: initial;
    width: 100%;
  }
`;

const ChannelList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  padding-top: 20px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 8px;

  @media screen and (min-width: ${widescreenMinimumWidth}) {
    display: none;
  }
`;

const LinkToChannel = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &::before {
    content: '# ';
  }
`;

export { ChannelList, ChannelListWrapper, CloseButton, LinkToChannel };
