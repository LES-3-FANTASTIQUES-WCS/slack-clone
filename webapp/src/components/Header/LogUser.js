import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import UserPic from '../../assets/logo.svg';
import { LogUserStyle } from '../styles/Header';

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

const LogUser = () => {
  return (
    <LogUserStyle>
      <Dropdown
        trigger={trigger}
        options={options}
        pointing="top left"
        icon={null}
      />
    </LogUserStyle>
  );
};

export { LogUser };
