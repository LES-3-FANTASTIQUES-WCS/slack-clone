import React from 'react';
import {
  Icon,
  Menu,
  Segment,
  Sidebar,
  Grid,
  Modal,
  Button,
  Form,
} from 'semantic-ui-react';

class Side extends React.Component {
  state = {
    channels: [],
    isVisible: true,
    modalOpen: false,
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  componentDidMount() {
      //call function to hide sidebar 
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    //get channels from server
    fetch('http://localhost:8000/channels')
      .then(res => {
        return res.json();
      })
      .then(channels => {
        this.setState({ channels: channels.rows });
      });
  }

  //hide sidebar
  resize() {
    if (window.innerWidth <= 768) {
      this.setState({ isVisible: false });
    } else {
      this.setState({ isVisible: true });
    }
  }

  //   listChannels() {
  //     let channels = this.state.channels;
  //     return (
  //       <div>
  //         {channels.map((val, index) => {
  //           return (
  //             <Menu.Item onClick={this.getMessage} key={index}>
  //               {val}
  //             </Menu.Item>
  //           );
  //         })}
  //       </div>
  //     );
  //   }

  render() {
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
            visible={this.state.isVisible}
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
                    <Modal
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      trigger={
                        <Icon
                          onClick={this.handleOpen}
                          style={{ marginTop: '0.5em', marginLeft: '4em' }}
                          name="plus circle"
                        />
                      }
                    >
                      <Modal.Header>
                        Créer une chaîne de discussion
                      </Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form>
                            <Form.Field>
                              <label>Nom de la chaîne</label>
                              <input />
                            </Form.Field>
                            <Form.Field>
                              <label>But de la chaîne</label>
                              <input />
                            </Form.Field>
                            <Button onClick={this.handleClose}>Annuler</Button>
                            <Button type="submit">Créer la chaîne</Button>
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Menu.Item>
            <div>
              {this.state.channels.map(channels => (
                <Menu.Item onClick={this.getMessage} key={channels.id}>
                  # {channels.name}
                </Menu.Item>
              ))}
            </div>
            {/* {this.listChannels()} */}
          </Sidebar>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default Side;
