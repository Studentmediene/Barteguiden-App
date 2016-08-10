import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import _ from 'lodash';
import { formatDate } from '../utilities';
import { backgroundColor, highlightColor } from '../colors';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
} from 'react-native';


class EventList extends Component {
  constructor() {
    super();
    this._updateDataSource = this._updateDataSource.bind(this);
    this._renderEvent = this._renderEvent.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
      loaded: false,
    };
  }

  componentWillMount() {
    if (this.props.events) {
      this._updateDataSource(this.props.events);
    }
  }

  componentWillReceiveProps(props) {
    this._updateDataSource(props.events);
  }

  _updateDataSource(events) {
    const newDataBlob = _.groupBy(events, (event) => (
      formatDate(event.startAt)
    ));

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(newDataBlob),
    });
  }

  _renderEvent(event) {
    return (
      <EventListItem navigator={this.props.navigator} event={event} />
    );
  }

  _renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>{sectionID}</Text>
      </View>
    );
  }

  render() {
    if (this.props.eventsLoading) {
      return (
        <ActivityIndicator />
      );
    }
    return (<ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderEvent}
      renderSectionHeader={this._renderSectionHeader}
      automaticallyAdjustContentInsets={false}
      contentInset={{ bottom: 49 }}
      style={styles.listView}
    />);
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor,
  },
  sectionHeader: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  headerContainer: {
    borderBottomWidth: 3,
    borderColor: highlightColor,
    backgroundColor,
  },
});

const mapStateToProps = state => ({
  eventsLoading: state.events.eventsLoading,
});

export default connect(mapStateToProps)(EventList);
