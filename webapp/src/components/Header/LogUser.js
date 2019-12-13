import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import UserPic from '../../assert/logo.svg';
import { LogUserStyle } from '../styles/Header';

const Trigger = ({ currentUser }) => {
  return (
    <span>
      <Image avatar src={UserPic} /> {currentUser.username}
    </span>
  );
};

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
];

const LogUser = ({ currentUser }) => {
  return (
    <LogUserStyle>
      <Dropdown
        trigger={<Trigger currentUser={currentUser} />}
        options={options}
        pointing="top left"
        icon={null}
      />
    </LogUserStyle>
  );
};

export { LogUser };
