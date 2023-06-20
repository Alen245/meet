import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
  };

  componentDidMount() {
    // Set a flag to indicate that the component is mounted
    this.mounted = true;
    // Fetch events and locations when the component mounts
    this.getEventsAndLocations();
  }

  componentWillUnmount() {
    // Set the mounted flag to false when the component is unmounted
    this.mounted = false;
  }

  getEventsAndLocations = async () => {
    try {
      // Fetch events from the API
      const events = await getEvents();
      if (this.mounted) {
        // Extract unique locations from the events and update the state
        const locations = extractLocations(events);
        this.setState({ events, locations });
      }
    } catch (error) {
      // Handle error if any
    }
  };

  updateEvents = async (location) => {
    try {
      // Fetch events from the API
      const events = await getEvents();
      // Filter events based on the selected location or show all events if 'all' is selected
      const locationEvents =
        location === 'all' ? events : events.filter((event) => event.location === location);
      // Update the state with the filtered events
      this.setState({ events: locationEvents });
    } catch (error) {
      // Handle error if any
    }
  };

  render() {
    return (
      <div className="App">
        {/* Render the CitySearch component with locations and updateEvents function */}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        {/* Render the EventList component with events */}
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
