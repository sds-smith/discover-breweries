const express = require('express');

const {
    httpgetDefaultBreweries,
    httpGetGeoCode,
    httpGetBreweriesNearMe,
    httpGetSearchCityBreweries
} = require('./breweries.controller')

const breweriesRouter = express.Router();

breweriesRouter.use('/default_city', httpgetDefaultBreweries);
breweriesRouter.use('/get_geocode', httpGetGeoCode)
breweriesRouter.use('/by-dist?', httpGetBreweriesNearMe)
breweriesRouter.use('/by-city?', httpGetSearchCityBreweries)

module.exports = breweriesRouter;