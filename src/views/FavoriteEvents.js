'use strict';

import React from 'react';
import EventList from '../components/EventList';
import BarteguidenNavigator from '../BarteguidenNavigator';
import _ from 'lodash';

export default ({events, title}) => (
  <BarteguidenNavigator title={title}>
    <EventList events={_.filter(events, function(event) {
      return event.isFavorite;
    })}/>
  </BarteguidenNavigator>
);
