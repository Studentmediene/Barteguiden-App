'use strict';

import React, {NativeAppEventEmitter} from 'react-native'
import moment from 'moment'
import ActionButton from './ActionButton';
import RNCalendarEvents from 'react-native-calendar-events';
import Icon from 'react-native-vector-icons/Ionicons';
import {actionIconSize, iOSBlue} from '../constants';
import {getPlatformIcon} from '../utilities';

var SendIntentAndroid = React.Platform.OS === 'android' ? require('react-native-send-intent') : null;



const {
  StyleSheet,
  View,
  Component,
  Platform,
  Alert,
  } = React;

class CalendarButton extends Component {
  render() {
    return (
      <View>
        <ActionButton iconSize={actionIconSize} onClick={this.onClick.bind(this)}
                      iconName={getPlatformIcon('calendar')} styles={styles.button} iconColor={iOSBlue}/>
      </View>
    );
  }



  onClick() {
    if(Platform.OS === 'android'){
      this._addCalendarEventAndroid();
    }
    else {
      this._addCalendarEventIOS();
    }
  }

  _addCalendarEventAndroid() {
    var dateFormat = 'YYYY-MM-DD HH:mm';
    var event = this.props.event;
    SendIntentAndroid.addCalendarEvent({
      title: event.title,
      description: event.description,
      startDate: moment(event.startAt).format(dateFormat),
      endDate: ('endAt' in event) ? moment(event.endAt).format(dateFormat)
        : moment(event.startAt).add(2, 'h').format(dateFormat),
      recurrence: 'none',
      location: event.venue.name,
    });
  }

  _addCalendarEventIOS() {
    RNCalendarEvents.authorizeEventStore(({status}) => {
      // Authorize
    });

    // Set end date to two hours ahead if not specified
    let endDate = this.props.event.endAt;
    if(!endDate) {
      endDate = moment(this.props.event.startAt).add(2, 'hours');
    }

    RNCalendarEvents.saveEvent(this.props.event.title, {
      location: this.props.event.venue.name,
      notes: this.props.event.description,
      startDate: this.props.event.startAt,
      endDate: endDate,
    });
  }

  componentWillMount () {
    this.eventEmitter = NativeAppEventEmitter.addListener('eventSaveSuccess', (id) => {
      Alert.alert(
        'Hendelsen ble lagt til i kalenderen',
        '',
        [
          {text: 'OK'},
        ]
      )
    });

    this.eventEmitter = NativeAppEventEmitter.addListener('eventSaveError', (id) => {
      Alert.alert(
        'Noe gikk galt',
        '',
        [
          {text: 'OK'},
        ]
      )
    });
  }

  componentWillUnmount () {
    this.eventEmitter.remove();
  }
}

const styles = StyleSheet.create({
  button: {
  },
});

export default CalendarButton;
