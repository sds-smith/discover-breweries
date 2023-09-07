const axios = require('axios');
require('dotenv').config();

const {getGeoCode} = require('../geo-code/geo-code.model')

const OPEN_BREWERY_DB_BASE_URL = 'https://api.openbrewerydb.org/breweries';

async function getAllBreweries() {
    const breweryDocs = await getBreweries();
    const {breweriesToReturn} = await transformBreweryData(breweryDocs);
    return breweriesToReturn;
}

async function getBreweries(city=undefined, state=undefined, page=1, breweryDocs=[]) {
    let queryString = '';
    if (city) queryString += `by_city=${city}`
    if (state) {
        if (queryString.length > 0) queryString += '&';
        queryString += `by_state=${state}`
    }
    const response = await axios.get(`${OPEN_BREWERY_DB_BASE_URL}?${queryString}&per_page=50&page=${page}`);
    const breweriesResponse = await response.data;
    breweryDocs.push(...breweriesResponse);
    if (breweriesResponse.length === 50) {
        page ++
        await getBreweries(city, state, page, breweryDocs)
    };
    return breweryDocs;
};

// ! Helper functions
async function getBreweriesByCity(city, state) {
    try {
        const breweryDocs = await getBreweries(city, state);
        const {breweriesToReturn} = await transformBreweryData(breweryDocs);
        return {
            status: 200,
            breweriesToReturn
        }
    } catch (err) {
        console.log(err.message)
        return err
    }
};

async function getSearchCityBreweries(city, state) {
    const searchCityBreweries = await getBreweriesByCity(city, state)
    if (searchCityBreweries.status === 200) {
        return {
            ok: true,
            status: searchCityBreweries.status,
            data: {
                breweries: searchCityBreweries.breweriesToReturn,
                message: `Breweries Retrieved`
            }
        }
    } else {
        return {
            ok: false,
            status: 500,
            data: {
                message: searchCityBreweries.message
            }
        }
    }
}

async function transformBreweryData(breweryDocs) {
    try {
        const breweriesToReturn = [];
        const filteredBreweryDocs = breweryDocs
            .filter(doc => doc.country === 'United States')
        for (const breweryDoc of filteredBreweryDocs) {
            const {id, name, brewery_type, street, city, state, postal_code, website_url, longitude, latitude} = breweryDoc;
            let longToSet
            let latToSet
            if (!longitude || !latitude) {
                const {data} = await getGeoCode(postal_code?.split('-')[0])
                longToSet = data.lng
                latToSet = data.lat
            } else {
                longToSet = longitude
                latToSet = latitude
            }
            const brewery = {
                id,
                name,
                brewery_type,
                street,
                city,
                state,
                postal_code,
                website_url,
                longitude: longToSet,
                latitude: latToSet
            }
            breweriesToReturn.push(brewery)
        };
        return {
            status: 200,
            breweriesToReturn
        }
    } catch (err) {
        console.log(err.message)
        return err
    }
}


module.exports = {
    getAllBreweries,
    getBreweries,
    getBreweriesByCity,
    getSearchCityBreweries,
    transformBreweryData
}