# Discover Breweries

A brewery locator app built for the [RSM HCD Coding Challenge](https://github.com/sds-smith/rsm-hcd-coding-challenge/blob/main/RSM%20HCD%20Coding%20Challenge%20Instructions.pdf) and powered by the [OpenBreweryDB API](https://www.openbrewerydb.org/documentation).

## Primary Tech Stack:
 * MongoDB
 * Express.js 4.18.2
 * React.js 18.2.8
 * Node.js 18.12.1

### Additional Technologies used:
 * React Router for client-side routing
 * TypeScript for all client-side code
 * Axios for http requests (client to server and server to external api)
 * Google-map-react for Google Maps integration
 * SCSS for Styling
 * Mongoose for MongoDB integration
 * Docker for containerizing the app for deployment

 ## Demo the App:
 The app is hosted live at some url. Feel free to try it out, or click the thumbnail below to view a short video.
 
 [![video link](http://img.youtube.com/vi/AsdvD8i8Wd4/0.jpg)](https://youtu.be/AsdvD8i8Wd4)


 ## UI/UX Flow:
 When the user navigates to the home page, they are presented with a list of all breweries in a default city (default_city, NC), provided by [OpenBreweryDB](https://www.openbrewerydb.org/documentation).

 Within the list, the user is able to:
  * Click on any brewery name to be routed to an individual brewery card displaying location information, including an embedded instance of Google Maps showing the brewery's location. 
  * Click on any brewery url to open the brewery's own website in a new tab.

 From any route in the App, the user will see a persistent header containing two navigation elements:
  * Beer mug icon - returns to the home page
  * Find Breweries Near Me - leverages the browser's built-in Geolocation API (with the user's explicit permission) to display a list of breweries closest to the client's location returned from OpenBreweryDB.
 
 From any individual brewery card, the user can click the back arrow to return to the list from which they originally navigated to the brewery card.

## Server-side functionality:
The versionable REST API follows the MVC design pattern and is accessed through the `/v1` path. It consists of one router (BreweriesRouter) at `v1/breweries`. 

BreweriesRouter contains three endpoints:
 * `/default_city` returns the default list of breweries for display on the home page. This list is persisted in a MongoDB Cluster.
 * `get_geocode?[BREWERY POSTAL CODE]` returns the latitude and longitude for any brewery that is missing that data in OpenBreweryDB. A request is sent to the Google Maps API.
 * `/by-dist?[CLIENT GEOLOCATION DATA]` returns a list of breweries closest to the user's current location. A request is sent to the OpenBreweryDB API.