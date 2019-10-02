import React from 'react';
import { Icon, Menu, Segment, Sidebar, Grid } from 'semantic-ui-react';

const Side = () => {
  return (
    <div
      style={{ height: '100vh', display: 'flex', flexFlow: 'column nowrap' }}
    >
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
          style={{ width: '200px' }}
        >
          <Menu.Item>
            <Grid columns="two" divided>
              <Grid.Row>
                <Grid.Column>
                  <h3 style={{ textAlign: 'left', marginBottom: '1.5em' }}>
                    Channels
                  </h3>
                </Grid.Column>
                <Grid.Column>
                  <Icon style={{marginTop:'0.5em', marginLeft:'4em'}} name='plus circle'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Menu.Item>
          <Menu.Item as="a"># general</Menu.Item>
          <Menu.Item as="a"># random</Menu.Item>
        </Sidebar>
      </Sidebar.Pushable>
    </div>
  );
};

export default Side;
