import React, { useContext } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import UserPic from '../../assert/logo.svg';
import { LogUserStyle } from '../styles/Header';
import contextCurrentUser from '../../context/ContextCurrentUser';

const Trigger = ({ currentUser }) => {
  return (
    <span>
      <Image avatar src={UserPic} /> {currentUser.username}
    </span>
  );
};

const options = [
  { key: 'user', text: 'Compte', icon: 'user' },
  { key: 'settings', text: 'Paramètres', icon: 'settings' },
  { key: 'sign-out', text: 'Déconnexion', icon: 'sign out' },
];

const LogUser = ({ currentUser }) => {
  const { setCurrentUser } = useContext(contextCurrentUser);
  const logOut = async key => {
    if (key === 'sign-out') {
      const response = await fetch('/api/sessions', {
        headers: { 'Content-Type': 'Application/json' },
        method: 'DELETE',
      });
      if (response.ok) {
        setCurrentUser(null);
      }
    }
  };
  return (
    <LogUserStyle>
      <Dropdown trigger={<Trigger currentUser={currentUser} />}>
        <Dropdown.Menu>
          {options.map(item => (
            <Dropdown.Item
              key={item.key}
              icon={item.icon}
              onClick={() => logOut(item.key)}
              text={item.text}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </LogUserStyle>
  );
};

export { LogUser };
