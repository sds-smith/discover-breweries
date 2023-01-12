const path = require('path');
const axios = require('axios');
require('dotenv').config();

const breweries = require('./breweries.mongo');

const OPEN_BREWERY_DB_BASE_URL = 'https://api.openbrewerydb.org/breweries';
const DEFAULT_CITY='asheville';
const GOOGLE_MAPS_API_BASE_URL=`https://maps.googleapis.com/maps/api`

//Mongo Functions
async function loadBreweriesData() {
    const checkBrewery = await findBrewery({
        id: "archetype-brewing-asheville"
    });
    if (checkBrewery) {
        console.log('Brewery data already loaded!');
    } else {
        populateBreweriesData();
    };
};

async function findBrewery(filter) {
    return await breweries.findOne(filter)
};

async function saveBrewery(brewery) {
    await breweries.findOneAndUpdate({
        id: brewery.id
    },
    brewery,
    {
        upsert: true
    });
};

async function populateBreweriesData() {
    console.log('Downloading breweries data...');
    try {
        const response = await axios.get(`${OPEN_BREWERY_DB_BASE_URL}?by_city=${DEFAULT_CITY}`);
        const breweryDocs = await response.data;
        for (const breweryDoc of breweryDocs) {
            const {id, name, brewery_type, street, city, state, postal_code, website_url, longitude, latitude} = breweryDoc;
            let longToSet
            let latToSet
            if (!longitude || !latitude) {
                const {data} = await getGeoCode(postal_code)
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
            await saveBrewery(brewery)
        };
        return {
            ok: true,
            status: 201
        }
    } catch (err) {
        console.log(err.message)
        return {
            ok: false,
            status: 500,
            message: err.message
        } 
    }

};

async function getDefaultBreweries() {
        return await breweries
        .find({}, {
            '_id': 0,
            '__v': 0
        })
};

//External API functions
async function getGeoCode(postal_code) {
    try {
        const geoResponse = await axios.get(
            `${GOOGLE_MAPS_API_BASE_URL}/geocode/json?components=postal_code:${postal_code}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        const {lat, lng} = await geoResponse.data.results[0].geometry.location;
        return {
            ok: true,
            status: 200,
            data: {
                message: "lat long retrieved",
                lat: Number(lat),
                lng: Number(lng)
            }
        };
    } catch(err) {
        return {
            ok: false,
            status: 500,
            data: {
                message: err.message
            }
        } 
    }
};

async function getBreweriesByCity(city) {
    try {
        const response = await axios.get(`${OPEN_BREWERY_DB_BASE_URL}?by_city=${city}`);
        const breweryDocs = await response.data;
        const breweriesToReturn = []
        for (const breweryDoc of breweryDocs) {
            const {id, name, brewery_type, street, city, state, postal_code, website_url, longitude, latitude} = breweryDoc;
            let longToSet
            let latToSet
            if (!longitude || !latitude) {
                const {data} = await getGeoCode(postal_code)
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

async function getSearchCityBreweries(city) {
    const searchCityBreweries = await getBreweriesByCity(city)
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

async function getBreweriesNearMe(latLong) {
    try {
        const response = await axios.get(`${OPEN_BREWERY_DB_BASE_URL}?by_dist=${latLong}`);
        const breweries = await response.data;
        return {
            ok: true,
            status: 200,
            data: {
                message: "Breweries Retrieved",
                breweries
            }
        }
    } catch(err) {
        return {
            ok: false,
            status: 500,
            data: {
                message: err.message
            }
        }
    }
}

module.exports = {
    loadBreweriesData,
    getDefaultBreweries,
    getGeoCode,
    getSearchCityBreweries,
    getBreweriesNearMe
}