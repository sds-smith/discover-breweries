const {
    getDefaultBreweries,
    getSearchCityBreweries
} = require('../../models/breweries/breweries.model');

async function httpgetDefaultBreweries(req, res) {
    const response = await getDefaultBreweries()
    return res.status(200).json(response)
};

async function httpGetSearchCityBreweries(req, res) {
    const {city, state} = req.query
    const response = await getSearchCityBreweries(city, state)
    return res.status(200).json(response)
};

module.exports = {
    httpgetDefaultBreweries,
    httpGetSearchCityBreweries,
};