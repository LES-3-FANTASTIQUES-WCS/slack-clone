import React from 'react';
import PropTypes from 'prop-types';

import { Burger, BurgerWrapper } from './ToggleChannelList.styled';
import ChannelList from '../ChannelList/ChannelList';

class ToggleChannelList extends React.Component {
  state = {
    isOpen: false,
  };

  toggleIsOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <>
        <ChannelList
          isOpen={this.state.isOpen}
          channels={this.props.channels}
          closeChannelList={this.toggleIsOpen}
        />

        <BurgerWrapper>
          <Burger aria-label="menu" onClick={this.toggleIsOpen}>
            ☰
          </Burger>
        </BurgerWrapper>
      </>
    );
  }
}

ToggleChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default ToggleChannelList;
