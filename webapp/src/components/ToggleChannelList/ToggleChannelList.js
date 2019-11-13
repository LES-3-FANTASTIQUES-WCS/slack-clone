import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Burger, BurgerWrapper } from './ToggleChannelList.styled';
import ChannelList from '../ChannelList/ChannelList';

const useIsOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return [isOpen, toggleIsOpen];
};

const ToggleChannelList = props => {
  const [isOpen, toggleIsOpen] = useIsOpen();

  return (
    <>
      <ChannelList
        isOpen={isOpen}
        channels={props.channels}
        closeChannelList={toggleIsOpen}
      />

      <BurgerWrapper>
        <Burger aria-label="menu" onClick={toggleIsOpen}>
          ☰
        </Burger>
      </BurgerWrapper>
    </>
  );
};

ToggleChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default ToggleChannelList;
