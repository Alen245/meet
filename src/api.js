import { mockData } from './mock-data';

// Function to extract unique locations from the events array
export const extractLocations = (events) => {
    const extractLocations = events.map((event) => event.location);
    const locations = [...new Set(extractLocations)];
    return locations;
};

// Simulated function to get events from an API
export const getEvents = async () => {
    // Simulate API response with mockData
    const mockResponse = { data: { events: mockData } };
    return mockResponse.data.events;
};

// Simulated function to get an access token
export const getAccessToken = async () => {
    // Simulate access token retrieval with a mock token
    const mockAccessToken = 'mockAccessToken';
    return mockAccessToken;
};