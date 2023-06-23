# meet
FEATURE 1: FILTER EVENTS BY CITY

SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city


**Feature 2: Show/Hide an Event's Details**

User Story: As a user, I want to be able to show or hide event details so that I can manage the
visibility of event-specific information.
Scenario 1: An event element is collapsed by default
- Given there is an event element
- When the event is displayed
- Then the event element should be collapsed
Scenario 2: User can expand an event to see its details
- Given there is a collapsed event element
- When the user clicks on the event to expand it
- Then the event details should be displayed
Scenario 3: User can collapse an event to hide its details
- Given there is an expanded event element
- When the user clicks on the event to collapse it
- Then the event details should be hidden
**Feature 3: Specify Number of Events**
  
User Story: As a user, I want to be able to specify the number of events I want to see so that I
can control the amount of event information displayed.
Scenario 1: When user hasn't specified a number, 32 is the default number
- Given the user has not specified the number of events
- When the events are displayed
- Then the system should show a default of 32 events
Scenario 2: User can change the number of events they want to see
- Given the events are displayed with a default number
- When the user selects a different number of events
- Then the system should update the displayed events according to the selected number
**Feature 4: Use the App When Offline**
  
User Story: As a user, I want to be able to use the app even when I don't have an internet
connection, so that I can access cached data and perform certain actions.
Scenario 1: Show cached data when there's no internet connection
- Given there is no internet connection
- When the user tries to access the app or view events
- Then the system should display the cached data
Scenario 2: Show error when user changes the settings (city, time range)
- Given the user is changing the app settings (city, time range)
- When there is no internet connection
- Then the system should show an error message informing the user about the inability to
update settings
**Feature 5: Data Visualization**
  
User Story: As a user, I want to see a chart displaying the number of upcoming events in each
city, so that I can have a visual overview of event distribution.
Scenario 1: Show a chart with the number of upcoming events in each city
- Given there are upcoming events in multiple cities
- When the user accesses the data visualization feature
- Then the system should display a chart showing the number of upcoming events in each city
