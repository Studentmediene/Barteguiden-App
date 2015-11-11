/**
 * Barteguiden App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native'
import EventList from './src/EventList';
import EventMixin from './src/EventMixin';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} = React;


var BarteguidenApp = React.createClass({
  mixins: [EventMixin],

  getInitialState: function() {
    return {
      selectedTab: 'all'
    };
  },

  _renderEvents: function(pageText: string) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Arrangementer</Text>
        </View>
        <EventList events={this.state.events} showOnlyUserFavorites={false}/>
      </View>
    );
  },

  _renderContent: function(pageText: string) {
    return (
      <View style={styles.container}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  },


  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Alle"
          icon={{ uri: "all", isStatic: true }}
          selected={this.state.selectedTab === 'all'}
          onPress={() => {
            this.setState({
              selectedTab: 'all',
            });
          }}>
          {this._renderEvents('Alle')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Favoritter"
          icon={{ uri: "favorites", isStatic: true }}
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'favorites',
            });
          }}>
          {this._renderContent('Favoritter')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Innstillinger"
          icon={{ uri: "settings", isStatic: true }}
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          {this._renderContent('Innstillinger')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 25
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black'
  },
  tabText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('BarteguidenApp', () => BarteguidenApp);
