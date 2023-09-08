
const {breweries} = require('./breweries.mongo');

async function getSearchCityBreweries(city, state) {
    const filter = {city};
    if (state !== undefined) filter.state = state;
    const breweriesToReturn = await breweries
    .find(filter, {
        '_id': 0,
        '__v': 0
    });
    return {
        breweries: breweriesToReturn,
        message: `Breweries Retrieved`
    }
};

module.exports = {
    getSearchCityBreweries
};