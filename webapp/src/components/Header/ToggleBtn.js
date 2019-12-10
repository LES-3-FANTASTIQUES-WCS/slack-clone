import React, { Component } from 'react';
import Logo from '../../assets/logo.svg';
import { Responsive, Button, Image, Header } from 'semantic-ui-react';
import { ToggleBtnStyle } from '../styles/Header';

class ToggleBtn extends Component {
  state = { isToggleOn: true };

  displaySide = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
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
            link="_blank"
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
