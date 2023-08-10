**CityMeet App** 

**Description**
CityMeet enables users to explore events by city, granting them access to a comprehensive list of events either within a specific city or spanning multiple cities. Two charts embellish the app: one detailing upcoming events scheduled for that city and another representing event genre popularity via a pie chart. This progressive web application, crafted using React with the Test-Driven Development approach, functions offline and is compatible with mobile devices and desktops alike. For authentication, serverless AWS Lambda functions are employed, producing the OAuth 2 token required to fetch event details from the Google Calendar API. The Recharts library has been integrated to beautifully visualize data through scatter and pie charts.

**Technical Aspects**
- Stack: React, Recharts, AWS Lambda, Serverless, Jest, Cucumber-Jest, Puppeteer, Atatus, etc.
- Features:
  - AWS Lambda-powered serverless functions.
  - OAuth management and Google Calendar API access via serverless.
  - Data visualization using React Recharts.
  - Unit and integration tests utilizing Jest.
  - Shallow and full rendering for unit and integration tests respectively through Enzyme.
  - User journey and comprehensive testing with Puppeteer.
  - Progressive Web Application capabilities.

**Functional Outlines**

**1. City-specific Event Filtering**
- **Objective**: Let users view events in their chosen city.
  - On app start, without a specific city input, display events from all cities.
  - As users type a city, suggest matching cities.
  - Upon city selection (e.g., "Berlin, Germany"), update to display pertinent city events.

**2. Toggling Event Details**
- **Objective**: Grant users control over event detail visibility.
  - By default, events appear with basic information.
  - Clicking "show details" reveals more about the event.
  - Clicking "hide details" reverts to the basic view.

**3. Event Quantity Customization**
- **Objective**: Allow users to determine how many events appear.
  - Default setting showcases 32 events.
  - Users can modify this number to see more or fewer events.

**4. Offline Usability**
- **Objective**: Provide offline access to previously viewed events.
  - Offline users see events from their last online session.
  - Changes to settings while offline (like city or time range) will prompt an error due to the lack of an internet connection.

**5. Graphical Insights**
- **Objective**: Offer a graphical representation of upcoming city events.
  - After selecting a specific city, clicking "Visualize" presents a chart detailing upcoming events in that city.
