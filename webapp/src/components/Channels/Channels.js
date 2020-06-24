import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Sidebar,
  Grid,
  Icon,
  Modal,
  Button,
  Form,
} from 'semantic-ui-react';

import AddModal from '../modal/Modal';
import {
  HeaderChannelList,
  ChannelWrapper,
  SidebarTitle,
  ButtonClose,
} from '../styles/Channels';
import SearchBar from '../../components/Header/SearchBar';
import contextCurrentUser from '../../context/ContextCurrentUser';

class Channels extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      users: [],
      isMobileScreen: false,
      showMore: false,
      activeItem: true,
      isOpen: false,
      openChannel: '',
      idInput: '',
      userAdmin: false,
      showErrorMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ showErrorMessage: false });
    this.setState({ idInput: event.target.value });
  }

  selectChannelActive = id => {
    this.setState({ activeItem: id });
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      window.addEventListener('resize', this.getMobileScreen.bind(this));
      this.getMobileScreen();

      this.getChannels();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //get channels from server
  getChannels = async () => {
    const response = await fetch('/api/channels');
    const { channels } = await response.json();
    this.setState({ channels });
  };

  getUsers = async channelId => {
    const res = await fetch(`/api/permissionOnChannel/${channelId}`);
    const user = await res.json();
    user.role === 'admin'
      ? this.setState({ userAdmin: true })
      : this.setState({ userAdmin: false });
    this.setState({ openChannel: channelId });
    const response = await fetch(`/api/channels/${channelId}/users`);
    const users = await response.json();
    this.setState({ users });
    this.setState({ isOpen: true });
  };

  getMobileScreen() {
    if (window.innerWidth < 768) {
      this.setState({ isMobileScreen: true });
    } else {
      this.setState({ isMobileScreen: false });
    }
  }

  showMore = () => this.setState({ showMore: !this.state.showMore });
  static contextType = contextCurrentUser;

  sendChannelActive = (channelName, id) => {
    this.context.setChannelActive(id);
    this.props.getChannelActive(channelName);
    this.state.isMobileScreen && this.props.toggleSidebar();
    this.setState({ activeItem: !this.state.activeItem });
    this.selectChannelActive(id);
  };

  handleClose = () => this.setState({ isOpen: false });

  addUserToChannel = async () => {
    const idUsers = [];
    this.state.users.map(user => idUsers.push(user.id));
    if (idUsers.includes(parseInt(this.state.idInput))) {
      this.setState({ showErrorMessage: true });
    } else {
      this.setState({ showErrorMessage: false });
      await fetch(`/api/addUser`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          channelId: this.state.openChannel,
          userId: this.state.idInput,
        }),
      });
      this.setState({ idInput: '' });
      document.getElementById('id_user').reset();
      const getResponse = await fetch(`/api/users/${this.state.openChannel}`);
      const users = await getResponse.json();
      this.setState({ users });
    }
  };

  removeUserFromChannel = async userId => {
    await fetch(`/api/removePermission`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify({
        channelId: this.state.openChannel,
        userId: userId,
      }),
    });
    const getResponse = await fetch(`/api/users/${this.state.openChannel}`);
    const users = await getResponse.json();
    this.setState({ users });
  };

  render() {
    const isShow = this.state.showMore;

    return (
      this.props.isOpen && (
        <ChannelWrapper>
          <Modal
            closeIcon
            centered
            size="small"
            onClose={this.handleClose}
            open={this.state.isOpen}
          >
            <Modal.Header>Utilisateurs sur ce channel</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                {this.state.users &&
                  this.state.users.map(user => (
                    <p key={user.id}>
                      {user.username}{' '}
                      {this.state.userAdmin &&
                        this.context.currentUser.id !== user.id && (
                          <Icon
                            style={{ cursor: 'pointer' }}
                            name="trash"
                            onClick={() => this.removeUserFromChannel(user.id)}
                          />
                        )}
                    </p>
                  ))}
                {this.state.userAdmin && (
                  <Form id="id_user" onSubmit={() => this.addUserToChannel()}>
                    <Form.Field>
                      <label>Ajouter un utilisateur</label>
                      <input
                        style={{ width: '150px' }}
                        onChange={this.handleChange}
                        value={this.idInput}
                        type="text"
                        id="id_user"
                        placeholder="ID de l'utilisateur"
                        label=""
                      />
                    </Form.Field>
                    <Button color="green" type="submit">
                      Ajouter
                    </Button>
                    {this.state.showErrorMessage && (
                      <p style={{ color: 'red' }}>
                        Cet utilisatuer est déjà présent sur ce channel.
                      </p>
                    )}
                  </Form>
                )}
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            vertical
            visible={this.props.isOpen}
            style={{ overflowX: 'hidden' }}
          >
            {this.state.isMobileScreen && (
              <ButtonClose>
                <Icon
                  name="close"
                  onClick={this.props.toggleSidebar}
                  style={{ fontSize: '1.5em' }}
                  inverted
                />
              </ButtonClose>
            )}

            <HeaderChannelList>
              <Menu.Item>
                <Grid columns="two" divided>
                  <Grid.Row>
                    <Grid.Column>
                      <SidebarTitle>Channels</SidebarTitle>
                    </Grid.Column>
                    <Grid.Column>
                      <AddModal getChannels={this.getChannels} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Menu.Item>
            </HeaderChannelList>

            <div style={{ zIndex: 0 }}>
              {this.state.channels.slice(0, 5).map(channels => (
                <Menu.Item
                  as={Link}
                  to={`/dashboard/channels/${channels.id}/messages`}
                  active={this.state.activeItem === channels.id}
                  onClick={() =>
                    this.sendChannelActive(channels.name, channels.id)
                  }
                  key={channels.id}
                >
                  <p>
                    {' '}
                    # {channels.name}{' '}
                    <Icon
                      name="user"
                      onClick={() => this.getUsers(channels.id)}
                      inverted
                    />
                  </p>
                </Menu.Item>
              ))}
              {isShow &&
                this.state.channels.slice(5).map(channels => (
                  <Menu.Item
                    as={Link}
                    to={`/dashboard/channels/${channels.id}/messages`}
                    active={this.state.activeItem === channels.id}
                    onClick={() =>
                      this.sendChannelActive(channels.name, channels.id)
                    }
                    key={channels.id}
                  >
                    <p>
                      {' '}
                      # {channels.name}{' '}
                      <Icon
                        name="user"
                        onClick={() => this.getUsers(channels.id)}
                        inverted
                      />
                    </p>
                  </Menu.Item>
                ))}

              {this.state.channels.length > 5 && (
                <Menu.Item
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={this.showMore}
                  active
                >
                  {isShow ? 'Voir moins' : 'Voir plus'}
                </Menu.Item>
              )}
            </div>
            {this.state.isMobileScreen && (
              <SearchBar style={{ marginTop: '5em' }} />
            )}
          </Sidebar>
        </ChannelWrapper>
      )
    );
  }
}
export default Channels;
