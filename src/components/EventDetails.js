/**
 * Barteguiden App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react';
import {formatDate, formatPrice} from '../utilities';
import EventDescription from './EventDescription';
import EventDetailsImage from './EventDetailsImage';
import {backgroundColor} from '../colors';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

class EventDetails extends Component {
  render() {
    let bottomPadding = Platform.OS === "android" ? 0 : 50;
    return (
      <View style={[styles.container, {paddingBottom: bottomPadding}]}>
        <EventDetailsImage event={this.props.event}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.descriptionContainer}>
            <EventDescription event={this.props.event}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  descriptionContainer: {
    backgroundColor: backgroundColor,
    flex: 1,
  },
  scroll: {
    backgroundColor: backgroundColor,
  }
});

export default EventDetails;
