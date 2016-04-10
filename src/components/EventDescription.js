/**
 * Barteguiden App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native'
import CalendarButton from './CalendarButton'
import ExternalLink from './ExternalLink';

var HTMLView = require('react-native-htmlview')

const {
  StyleSheet,
  Text,
  View,
  Component,
  } = React;

class EventDescription extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.descriptionHeaderAndIcon}>
          <Text style={styles.descriptionHeader}>Beskrivelse</Text>
          <CalendarButton event={this.props.event}/>
        </View>
        <HTMLView
          value={this.props.event.description}
        />
        <ExternalLink url={this.props.event.eventUrl} linkText={'Link til arrangementet'}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  descriptionHeader: {
    fontSize: 18,
    paddingBottom: 5,
  },
  descriptionHeaderAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EventDescription;
