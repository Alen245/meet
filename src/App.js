import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import EventGenre from './EventGenre';
import NumberOfEvents from "./NumberOfEvents";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
    showWelcomeScreen: true,
  };

  componentDidMount() {
    getEvents().then((events) => {
      this.setState({ events, locations: extractLocations(events) });
    });
  }

  componentWillUnmount() {
    // Clean up any necessary operations if needed
  }

  handleLogin = () => {
    this.setState({ showWelcomeScreen: false });
  };

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all' ? events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { showWelcomeScreen } = this.state;

    if (showWelcomeScreen) {
      return <WelcomeScreen handleLogin={this.handleLogin} />;
    }

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
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventGenre events={this.state.events} />
      </div>
    );
  }
}

export default App;
