import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import { getRandomBrewdog } from './punkapi';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      isLoading: false
    }
  }

  _getRandomBrewdogWithFeedback = () => {
    this.setState({ isLoading: true })

    getRandomBrewdog()
    .then(json => this.setState({
      name: json[0].name,
      description: json[0].description,
      isLoading: false
    }))
    .catch(error => console.log(error))
  }
  componentWillMount() {
    this._getRandomBrewdogWithFeedback()
  }

  render() {
    const content = this.state.isLoading ?
    <ActivityIndicator /> :
    <View style={styles.infosContainer}>
      <Text style={styles.name}>
        {this.state.name}
      </Text>

      <Text style={styles.description}>
        {this.state.description}
      </Text>

      <TouchableOpacity
        onPress={this._getRandomBrewdogWithFeedback}
        style={styles.button}
      >
        <Text>Grab a new beer!</Text>
      </TouchableOpacity>
    </View>

    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // ajout de styles divers
  infosContainer: {
    margin: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});