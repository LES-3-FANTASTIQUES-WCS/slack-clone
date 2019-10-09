import React from 'react';
import UserPic from '../../assert/logo.svg';
import SearchBar from './SearchBar';
<<<<<<< HEAD
import { Segment, Dropdown, Image, Grid, Header } from 'semantic-ui-react';
import ToggleBtn from './ToggleBtn';
import { HeaderWrapper, ToggleBtnStyle } from '../styles/Header';
=======
import { Segment, Dropdown, Image, Grid } from 'semantic-ui-react';
import ToggleBtn from './ToggleBtn';
>>>>>>> fbc69e1e2f5de13628d07b5632e71c5da639181c

const trigger = (
  <span>
    <Image avatar src={UserPic} /> Username
  </span>
);

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
];

<<<<<<< HEAD
const TheHeader = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <Segment style={{ margin: '0rem ' }}>
        <Grid columns="equal">
          <ToggleBtnStyle>
            <ToggleBtn />
          </ToggleBtnStyle>

          <Grid.Column>
            <Header textAlign="center">#{channelName}</Header>
          </Grid.Column>

          <Grid.Column style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBar />
          </Grid.Column>
          <Grid.Column style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Dropdown
              trigger={trigger}
              options={options}
              pointing="top left"
              icon={null}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </HeaderWrapper>
=======
const TheHeader = () => {
  return (
    <Segment style={{ margin: '0rem ' }}>
      <Grid columns="equal">
        <Grid.Column style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <ToggleBtn />
        </Grid.Column>
        <Grid.Column style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </Grid.Column>
        <Grid.Column style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown
            trigger={trigger}
            options={options}
            pointing="top left"
            icon={null}
          />
        </Grid.Column>
      </Grid>
    </Segment>
>>>>>>> fbc69e1e2f5de13628d07b5632e71c5da639181c
  );
};

export default TheHeader;
