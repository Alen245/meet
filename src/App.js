import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import EventGenre from './EventGenre';
import NumberOfEvents from './NumberOfEvents';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={locations} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <EventList events={events} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventGenre events={events} />
      </div>
    );
  }
}

export default App;
