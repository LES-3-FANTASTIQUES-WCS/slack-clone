import React from 'react';
import UserPic from './logo.svg';
import Logo from './logo192.png'
import { Input,Segment,Header,Dropdown,Image,Grid,Responsive, Button} from 'semantic-ui-react';


const trigger = (
    <span>
        <Image avatar src={UserPic} /> Username
    </span>
  )
  
  const options = [
    { key: 'user', text: 'Account', icon: 'user' },
    { key: 'settings', text: 'Settings', icon: 'settings' },
    { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
  ]
  
  const InputSearch = (
    <Input
      size= "mini"
      icon={{ name: 'search', circular: true, link: true }}
      placeholder='Search...'
    />
  )

  const LogoPerso = (
    <div>
    <Responsive as={Header} maxWidth={992}>
        <Button float="left">Dropdown</Button>
    </Responsive>
    <Responsive as={Header} minWidth={992}>
        <a href="https://fr.reactjs.org/" target="_blank">
            <Image  size ="mini" src={Logo} />
        </a>
    </Responsive>
  </div>
  )

const TheHeader = () => {
    return (
        <Segment style={{ margin: '0rem ' }}>
           <Grid  columns="equal">
                <Grid.Column>
                    <Header >
                        {LogoPerso}
                    </Header>
                </Grid.Column>
                <Grid.Column>
                    <Header >
                        {InputSearch}
                    </Header>
                </Grid.Column>
                <Grid.Column>
                    <Header textAlign="right">
                        <Dropdown 
                            trigger={trigger}
                            options={options}
                            pointing='top left'
                            icon={null}
                        />
                    </Header>
                </Grid.Column>
            </Grid>
        </Segment>                 
    )
}

  

export default TheHeader;


