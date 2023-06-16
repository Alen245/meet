import React, { Component } from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
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
        // Update the query state when a suggestion is clicked
        this.setState({
            query: suggestion,
        });
    };

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
                    value={query}
                    onChange={this.handleInputChanged}
                />
                <ul className="suggestions">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                    <li>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;
