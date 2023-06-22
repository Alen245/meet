import { mockData } from './mock-data';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
    const extractLocations = events.map((event) => event.location);
    const locations = [...new Set(extractLocations)];
    return locations;
};

const checkToken = async (accessToken) => {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
        const result = await response.json();
        return result;
    } catch (error) {
        return error.json();
    }
};

const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);
        const response = await fetch(`https://qoqibkhkyl.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodeCode}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { access_token } = await response.json();
        access_token && localStorage.setItem('access_token', access_token);
        return access_token;
    } catch (error) {
        return error.json();
    }
};

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        const newurl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname;
        window.history.pushState('', '', newurl);
    } else {
        const newurl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newurl);
    }
};

export const getEvents = async () => {
    NProgress.start();

    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return mockData;
    }
    if (!navigator.onLine) {
        const data = localStorage.getItem("lastEvents");
        NProgress.done();
        return data ? JSON.parse(events).events : [];;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = `https://qoqibkhkyl.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}`;
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            const locations = extractLocations(result.events);
            localStorage.setItem('lastEvents', JSON.stringify(result));
            localStorage.setItem('locations', JSON.stringify(locations));
            NProgress.done();
            return result.events;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if (!code) {
            const response = await fetch('https://qoqibkhkyl.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url');
            if (response.ok) {
                const result = await response.json();
                const { authUrl } = result;
                return (window.location.href = authUrl);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        return code && getToken(code);
    }
    return accessToken;
};
