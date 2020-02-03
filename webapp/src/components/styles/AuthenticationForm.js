import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SignInBtn = styled.button`
  background-color: #1164a3;
  color: #ffffff;
  border-radius: 0.25em;
  width: 180px;
  height: 40px;
`;

const SignUpBtn = styled.button`
  background-color: #7f868c;
  color: #ffffff;
  border-radius: 0.25em;
  width: 180px;
  height: 40px;
  margin-top: 1em;
`;

const InputName = styled(Input)`
  margin-bottom: 0.5em;
  width: 250px;
`;
const InputPassword = styled(Input)`
  width: 250px;
`;

export { SignInBtn, SignUpBtn, InputName, InputPassword };
