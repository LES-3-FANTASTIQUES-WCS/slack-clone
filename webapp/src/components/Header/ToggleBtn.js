import React, { Component } from 'react';
import Logo from '../../assert/logo.svg';
import { Responsive, Button, Image, Header } from 'semantic-ui-react';
import { ToggleBtnStyle } from '../styles/Header';

class ToggleBtn extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }

  displaySide = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }));
  };
  render() {
    return (
      <ToggleBtnStyle>
        <Responsive as={Header} maxWidth={992}>
          <Button onClick={this.displaySide} />
          {this.state.isToggleOn ? 'on' : 'off'}
        </Responsive>
        <Responsive as={Header} minWidth={992}>
          <a
            onClick=""
            href="https://fr.reactjs.org/"
            target="_blank"
            rel="noreferrer"
          >
            <Image size="mini" src={Logo} />
          </a>
        </Responsive>
      </ToggleBtnStyle>
    );
  }
}

export default ToggleBtn;
