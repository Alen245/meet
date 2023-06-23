import React, { Component } from "react";
import Alert from "./Alert";

class CitySearch extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            suggestions: [],
            showSuggestions: undefined,
            infoText: "",
        };
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (value === "") {
            this.setState({
                query: value,
                suggestions,
                infoText: "",
            });
        } else if (suggestions.length === 0) {
            this.setState({
                query: value,
                suggestions,
                infoText: 'We cannot find the city you are looking for. Please try another city.',
            });
        } else {
            this.setState({
                query: value,
                suggestions,
                infoText: "",
            });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: "",
        });

        this.props.updateEvents(suggestion);
    };

    render() {
        return (
            <div className="CitySearch">
                {this.state.infoText && (
                    <Alert type="error" text={this.state.infoText} />
                )}
                <input
                    type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => {
                        this.setState({ showSuggestions: true });
                    }}
                />
                <ul
                    className="suggestions"
                    style={this.state.showSuggestions ? {} : { display: "none" }}
                >
                    {this.state.suggestions.map((suggestion) => (
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
