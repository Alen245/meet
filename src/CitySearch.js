import React, { Component } from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    };

    handleInputChanged = (event) => {
        // Update the query state and filter the locations based on the input value
        const value = event.target.value;
        const suggestions = this.filterLocations(value);
        this.setState({
            query: value,
            suggestions,
        });
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    }

    filterLocations = (value) => {
        // Filter the locations based on the input value
        return this.props.locations.filter((location) => {
            return location.toUpperCase().includes(value.toUpperCase());
        });
    };

    render() {
        const { query, suggestions } = this.state;

        return (
            <div className="CitySearch">
                <input
                    type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                    <li onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;