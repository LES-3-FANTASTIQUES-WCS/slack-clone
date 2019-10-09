import React, { Component } from 'react';
import Logo from '../../assert/logo.svg';
import { Responsive, Button, Image, Header } from 'semantic-ui-react';

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
      <div style={{ display: 'flex', flex: 'left' }}>
        <Responsive as={Header} maxWidth={992}>
          <Button onClick={this.displaySide} />
<<<<<<< HEAD
          {this.state.isToggleOn ? '' : ''}
=======
          {this.state.isToggleOn ? 'on' : 'off'}
>>>>>>> fbc69e1e2f5de13628d07b5632e71c5da639181c
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
      </div>
    );
  }
}

export default ToggleBtn;
