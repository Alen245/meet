import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";
import EventGenre from "./EventGenre";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
    isLoggedIn: false,
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

  handleLogin = () => {
    // Perform login logic here, e.g., authenticate with Google

    // If login is successful, update the state
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { events, locations, isLoggedIn } = this.state;

    return (
      <div className="App">
        {!isLoggedIn ? (
          <WelcomeScreen handleLogin={this.handleLogin} />
        ) : (
          <>
            <CitySearch locations={locations} updateEvents={this.updateEvents} />
            <EventGenre events={events} />
            <EventList events={events} />
            <NumberOfEvents
              numberOfEvents={this.state.numberOfEvents}
              updateEvents={this.updateEvents}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
