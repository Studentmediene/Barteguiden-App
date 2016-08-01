'use strict';

import React, { Component, Children, cloneElement } from 'react';
import { highlightColor } from './colors';
import EventDetails from './components/EventDetails';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackAndroid,
  Platform,
} from 'react-native';


const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    let previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}
      >
        <Icon name="ios-arrow-back" size={35} color={highlightColor} />
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

const BarteguidenNavigator = React.createClass({
  render() {
    return (
      <Navigator
        sceneStyle={{ paddingTop: Platform.OS === 'ios' ? 64 : 0 }}
        initialRoute={{ id: 0, title: this.props.title }}
        renderScene={this._renderScene}
        navigationBar={Platform.OS === 'ios' ?
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={NavigationBarRouteMapper}
          /> : null
        }
        ref={(nav) => {
          BackAndroid.addEventListener('hardwareBackPress', () => {
            if (nav && nav.getCurrentRoutes() && nav.getCurrentRoutes().length > 0) {
              nav.pop();
              return true;
            }
            return false;
          });
        }}
      />
    );
  },

  _renderScene(route, navigator) {
    let children = Children.map(this.props.children, (element) =>
      cloneElement(element, { navigator })
    );

    switch (route.id) {
      case 0:
        return <View style={styles.container}>{children}</View>;
      case 1:
        return (
          <View style={styles.container}>
            <EventDetails eventID={route.event._id} />
          </View>
        );
    }
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    borderBottomWidth: 0.5,
    borderColor: '#AFAFAF',
  },
  navBarText: {
    fontSize: 18,
    marginVertical: 10,
    paddingBottom: 3,
  },
  navBarTitleText: {
    color: 'black',
    fontWeight: '600',
  },
  navBarLeftButton: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navBarButtonText: {
    color: highlightColor,
    paddingLeft: 10,
  },
});

export default BarteguidenNavigator;
