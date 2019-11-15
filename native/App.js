import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    height: 100,
  },
  input: {
    borderColor: '#b3b3b3',
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    paddingLeft: 15,
  },
  item: {
    backgroundColor: '#A9A9A9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const Home = props => {
  Home.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      toggleDrawer: PropTypes.func.isRequired,
    }).isRequired,
  };
  Home.navigationOptions = {
    title: 'Home',
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text
        style={styles.paragraph}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      >
        Open side
      </Text>
    </View>
  );
};

const API_SERVER_URL_ROOT = 'http://192.168.0.117:8000';

const Channels = props => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  Channels.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      toggleDrawer: PropTypes.func.isRequired,
    }).isRequired,
  };
  Channels.navigationOptions = {
    title: 'Channels',
  };

  const getChannels = async () => {
    const response = await fetch(`${API_SERVER_URL_ROOT}/api/channels`);
    const arrayChannels = await response.json();
    setChannels(arrayChannels);
    setLoading(false);
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <>
      {!loading ? (
        <View style={styles.container}>
          <Text>Channels</Text>
          <FlatList
            data={channels.channels}
            renderItem={channel => {
              return (
                <Text style={styles.item} id={channel.item.id}>
                  {channel.item.name}
                </Text>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text
            style={styles.paragraph}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            Open side
          </Text>
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </>
  );
};

const Message = props => {
  Message.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      toggleDrawer: PropTypes.func.isRequired,
    }).isRequired,
  };
  Message.navigationOptions = {
    title: 'Message',
  };
  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
      <Text>Message</Text>
      <Text
        style={styles.paragraph}
        onPress={() => {
          props.navigation.navigate('Home');
        }}
      >
        Go Home
      </Text>
      <Text
        style={styles.paragraph}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      >
        Open side
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType="default"
        keyboardAppearance="dark"
        clearButtonMode="while-editing"
        returnKeyType="send"
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};

const StackScreen = () => {
  return (
    <View>
      <Text />
      <Text />
      <Text />
    </View>
  );
};

const TabNavi = createMaterialTopTabNavigator(
  {
    Home: { screen: Home },
    Channels: { screen: Channels },
    Message: { screen: Message },
  },
  {
    initialRouteName: 'Channels',
    activeTintColor: '#F44336',
  }
);

const StackNavi = createStackNavigator({
  Main: {
    screen: TabNavi,
    navigationOptions: ({ navigation }) => ({
      header: <StackScreen navigation={navigation} />,
    }),
  },
});

const navigator = createDrawerNavigator({
  Home,
  Channels,
  Message,
});

const AppStack = createStackNavigator(
  {
    drawer: {
      screen: navigator,
    },
    nav: {
      screen: StackNavi,
    },
  },
  {
    initialRouteName: 'drawer',
    headerMode: 'float',
  }
);

const App = createAppContainer(AppStack);
export default App;
// eslint-disable-next-line no-unused-vars
// const Appcontainer = createAppContainer(navigator);
// const Drawer = () => <Appcontainer />;
// export default Drawer;
