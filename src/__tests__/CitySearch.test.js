import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;

    beforeAll(() => {
        // Extract locations from mockData
        locations = extractLocations(mockData);

        // Shallow render the CitySearch component with locations as props
        CitySearchWrapper = shallow(
            <CitySearch locations={locations} updateEvents={() => { }} />
        );
    });

    test('renders text input', () => {
        // Ensure that the component renders the text input element with the "city" class
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('renders a list of suggestions', () => {
        // Ensure that the component renders the list of suggestions with the "suggestions" class
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        // Ensure that the value of the text input matches the query state in the component
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {
        // Simulate a change event on the text input and verify that the query state is updated
        const eventObject = { target: { value: 'Berlin' } };
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    test('render list of suggestions correctly', () => {
        // Ensure that the list of suggestions is rendered correctly by comparing the rendered suggestions with the component state
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
            suggestions.length + 1
        );
        suggestions.forEach((suggestion, index) => {
            expect(CitySearchWrapper.find('.suggestions li').at(index).text()).toBe(
                suggestion
            );
        });
    });

    test('suggestion list matches the query when changed', () => {
        // Simulate a change event on the text input and verify that the suggestions are filtered correctly based on the query
        CitySearchWrapper.setState({ query: 'Berlin', suggestions: [] });
        CitySearchWrapper.instance().handleInputChanged({
            target: { value: 'Berlin' },
        });
        const filteredLocations = locations.filter((location) =>
            location.toUpperCase().includes('BERLIN')
        );
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });

    test('selecting a suggestion should change query state', () => {
        // Simulate a click event on a suggestion and verify that the query state is updated accordingly
        CitySearchWrapper.setState({
            query: 'Berlin',
            suggestions: ['Berlin', 'Paris', 'London'],
        });
        CitySearchWrapper.instance().handleItemClicked('Paris');
        expect(CitySearchWrapper.state('query')).toBe('Paris');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    });

    test("selecting CitySearch input reveals the suggestions list", () => {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
    });

    test("selecting a suggestion should hide the suggestions list", () => {
        CitySearchWrapper.setState({
            query: 'Berlin',
            showSuggestions: undefined
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
    });
});
