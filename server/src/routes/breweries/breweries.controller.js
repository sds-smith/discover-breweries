const {
    getDefaultBreweries,
    getGeoCode,
    getBreweriesNearMe,
    getSearchCityBreweries
} = require('../../models/breweries/breweries.model');

async function httpgetDefaultBreweries(req, res) {
    const response = await getDefaultBreweries()
    return res.status(200).json(response)
};

async function httpGetSearchCityBreweries(req, res) {
    const {city, state} = req.query
    const response = await getSearchCityBreweries(city, state)
    return res.status(response.status).json(response.data)
};

async function httpGetBreweriesNearMe(req, res) {
    const {latLong} = req.query
    const response = await getBreweriesNearMe(latLong)
    return res.status(response.status).json(response.data)
};

async function httpGetGeoCode(req, res) {
    const {postal_code} = req.query
    const response = await getGeoCode(postal_code)
    return res.status(response.status).json(response.data)
}

module.exports = {
    httpgetDefaultBreweries,
    httpGetSearchCityBreweries,
    httpGetGeoCode,
    httpGetBreweriesNearMe
};