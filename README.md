# Discover Breweries 3.0

A brewery locator app originally built for the RSM HCD Coding Challenge and powered by the [OpenBreweryDB API](https://www.openbrewerydb.org/documentation).

Since its original development as a full-stack MERN app in December, 2022, this app has seen multiple iterations, as it has become a personal playground where I can try out new things as I continue to explore and learn new technologies and skills.

**The main branch is up-to-date with the latest version, branch v3.0_lambda.**
To view the previous MERN stack version, please see branch [v2.0_mern](https://github.com/sds-smith/discover-breweries/tree/v2.0_mern).

For this iteration, I removed the node/express server and moved the backend logic into AWS Lambda function for a more lightweight serverless deployment.

The frontend React app is served from an AWS S3 bucket via an AWS Cloudfront distribution.

- Frontend code changes are deployed to S3 via aws cli script

- API calls to OpenBreweryDB are now made directly from the frontend on click of 'FIND BREWERIES NEAR ME'

Three Lambda functions power the backend, connecting to MongoDB Atlas and performing the full range of CRUD operations:

- `discover-breweries_rotateCities`
  - Triggered by a custom Cloudwatch Event which fires every 24 hours at midnight
  - Selects a new random city to feature and updates the list of featured breweries accordingly
- `discover-breweries_getFeaturedBreweries`
  - Triggered by an API Gateway when a request is sent to the custom endpoint from the app
  - Queries the featured city's breweries from MongoDB and returns the list to the app
- `discover-breweries_getSearchCityBreweries`
  - Here, API Gateway receives a query string in the request from the app and passes that payload through to the Lambda function
  - The Lambda function processes the payload and includes it in the Mongo query, returning the response to the frontend

## Primary Tech Stack

- MongoDB 6.0
- React.js 18.2.8
- AWS Cloudfront
- AWS S3 Buckets
- AWS Lambda
- AWS API Gateway
- AWS Cloudwatch Events

### Additional Technologies used:

- React Router for client-side routing
- TypeScript for all client-side code
- Axios for http requests
- Google-map-react for Google Maps integration
- Material UI Component Library
- CSS-in-JS (emotion) for styling
- Mongoose for MongoDB integration
