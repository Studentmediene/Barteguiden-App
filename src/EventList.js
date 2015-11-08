'use strict';

import React from  'react-native'
import moment from 'moment';
import 'moment/locale/nb';
import EventListItem from './EventListItem';

var {
  StyleSheet,
  Text,
  View,
  ListView,
} = React;


/*
 Function used for sorting the events by date.
 */
var sortByDate = function(event1, event2) {
  return new Date(event1.startAt).getTime() - new Date(event2.startAt).getTime();
};

var EventList = React.createClass({
  getInitialState: function() {
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    };

    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        getRowData: getRowData,
        getSectionData: getSectionData,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData(); // Makes sure data is only fetched once
  },

  fetchData: function() {
    fetch('http://barteguiden.no/api/events')
      .then((response) => response.json())
      .then((responseData) => responseData.sort(sortByDate))
      .then((sortedResponseData) => {
        var events = sortedResponseData,
            length = events.length,
            dataBlob = {},
            sectionIDs = [],
            rowIDs = [],
            dayIndex = -1,
            event,
            dateString;
        moment.locale('nb');

        for(var i = 0; i < length; i++) {
          event = events[i];
          dateString = moment(event.startAt).format('Do MMMM YYYY');
          if(sectionIDs.indexOf(dateString) === -1) {
            sectionIDs.push(dateString);
            dayIndex += 1;
            rowIDs[dayIndex] = [];
          }
          rowIDs[dayIndex].push(event._id);
          dataBlob[dateString + ':' + event._id] = event;
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
          loaded: true,
        });
        })
      .done();
  },

  _renderEvent: function(event) {
    return(
        <EventListItem event={event}/>
    )
  },

  render: function() {
   return (<ListView
     dataSource={this.state.dataSource}
     renderRow={this._renderEvent}
     renderSectionHeader = {this._renderSectionHeader}
     automaticallyAdjustContentInsets={false}
     contentInset={{bottom:49}}
     style={styles.listView}
   />)
  },

  _renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>{sectionID}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#EFEFEF'
  },
  sectionHeader: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 13,
    color: 'black',
    fontWeight: '600',
  },
  headerContainer: {
    borderBottomWidth: 3,
    borderColor: '#5CCFFF',
    backgroundColor: '#EFEFEF',
  }
});

export default EventList;
