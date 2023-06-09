# Discover Breweries 2.0

A brewery locator app built for the [RSM HCD Coding Challenge](<https://rsm-hcd-coding-challenge.s3.amazonaws.com/requirements/RSM+HCD+Coding+Challenge+Instructions+(1).pdf>) and powered by the [OpenBreweryDB API](https://www.openbrewerydb.org/documentation).

## [Jump to What's New](#whats-new)

## Primary Tech Stack

- MongoDB 6.0
- Express.js 4.18.2
- React.js 18.2.8
- Node.js 18.12.1

### Additional Technologies used:

- React Router for client-side routing
- TypeScript for all client-side code
- Axios for http requests (client to server and server to external api)
- Google-map-react for Google Maps integration
- Material UI Component Library
- CSS-in-JS (emotion) for styling
- Mongoose for MongoDB integration
- Docker for containerizing the app for shipping

## Demo the App

The app is hosted live at [https://dgx0klc0yfelo.cloudfront.net](https://dgx0klc0yfelo.cloudfront.net). Feel free to try it out.

## UI/UX Flow

When the user navigates to the home page, they are presented with a list of all breweries in a default city (Asheville, NC), provided by [OpenBreweryDB](https://www.openbrewerydb.org/documentation). The list displays the following information for each brewery:

- Name
- Brewery Type
- Address (Street, City, State, Zip)
- Website URL (Clickable)

Within the list, the user is able to:

- Click on any brewery name to be routed to an individual brewery page displaying location information, including name, address, and a map indicating the brewery's location using latitude and longitude.
- Click on any brewery url to open the brewery's website in a new tab.

From any route in the App, the user will see a persistent header containing two navigation buttons:

- Home - returns to the home page
- Find Breweries Near Me - leverages the browser's built-in Geolocation API (with the user's explicit permission) to display a list of breweries closest to the client's location, returned from OpenBreweryDB.

The header also contains a search bar where the user is able to search breweries by city (required) with optional State parameter.

Additional navigation is provided through a breadcrumb trail directly below the header.

## Server-side functionality

The versionable REST API follows the MVC design pattern and is accessed through the `/v1` path. It consists of one router (BreweriesRouter) at `v1/breweries`.

BreweriesRouter contains three endpoints:

- `'/default_city'` returns the default list of breweries for display on the home page. This list is generated from OpenBreweryDB and is persisted in a MongoDB Cluster.
- `'/by-dist?[CLIENT_GEOLOCATION_DATA]'` returns a list of breweries closest to the user's current location. A request is sent to the OpenBreweryDB API.
- `'/search?[CITY]'` returns a list of breweries in the city requested by the user in the search bar.

## Deployment and Hosting

The app is hosted on an AWS Cloudfront distribution from two load-balanced AWS EC2 instances, where it is running in a Docker container.

## What's New

### Version 2.0

- App converted to Material UI components
- Styling converted to CSS-in-JS/emotion
- Home page built out with Daily Featured City, Explore any City, and Explore Nearby Breweries
- Server logic added to select rotating daily city on 24 hour interval

[def]: #whats-new
