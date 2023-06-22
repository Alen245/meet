import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import NumberOfEvents from "./NumberOfEvents";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
    showWelcomeScreen: undefined,

  };

  componentDidMount() {
    this.mounted = true;     // Flag to track if the component is mounted
    getEvents().then((events) => {
      if (this.mounted) {    // Check if the component is still mounted before updating the state
        this.setState({ events, locations: extractLocations(events) });   // Update the state with fetched events and extracted locations
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;   // Set the mounted flag to false when the component is about to be unmounted
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all' ? events : events.filter((event) => event.location === location);   // Filter events based on the selected location
      this.setState({
        events: locationEvents    // Update the events state with the filtered events
      });
    });
  };

  render() {
    return (
      <div className="App">   {/* Root element of the App component */}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />   {/* Render the CitySearch component with locations and updateEvents props */}
        <EventList events={this.state.events} />    {/* Render the EventList component with events prop */}
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
      </div>
    );
  }
}

export default App;   // Export the App component as the default export
