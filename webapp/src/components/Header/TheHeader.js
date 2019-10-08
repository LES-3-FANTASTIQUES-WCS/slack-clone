import React from 'react';
import UserPic from '../../assert/logo.svg';
import SearchBar from './SearchBar';
import { Segment, Dropdown, Image, Grid } from 'semantic-ui-react';
import ToggleBtn from './ToggleBtn';

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
  );
};

export default TheHeader;
