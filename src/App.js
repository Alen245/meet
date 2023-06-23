import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import EventGenre from './EventGenre';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: '',
    showWelcomeScreen: undefined,
  };

  componentDidMount() {
    this.updateEvents();
  }

  updateEvents = () => {
    getEvents().then((events) => {
      this.setState({
        events,
        locations: extractLocations(events),
      });
    });
  };

  render() {
    const { events, locations } = this.state;

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <EventGenre events={events} />
        <EventList events={events} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
      </div>
    );
  }
}

export default App;
