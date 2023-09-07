const express = require('express');

const {
    httpgetDefaultBreweries,
    httpGetSearchCityBreweries
} = require('./breweries.controller')

const breweriesRouter = express.Router();

breweriesRouter.use('/default_city', httpgetDefaultBreweries);
breweriesRouter.use('/search?', httpGetSearchCityBreweries)

module.exports = breweriesRouter;