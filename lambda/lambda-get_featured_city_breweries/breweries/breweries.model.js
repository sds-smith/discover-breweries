
const {featured} = require('./breweries.mongo');

  async function getFeaturedBreweries() {
    const breweriesToReturn = await featured
    .find({}, {
        '_id': 0,
        '__v': 0
    });
    const featuredCity = breweriesToReturn[0]?.city
    return {
        DEFAULT_CITY : featuredCity,
        breweries: breweriesToReturn
    }
};

module.exports = {
    getFeaturedBreweries
};