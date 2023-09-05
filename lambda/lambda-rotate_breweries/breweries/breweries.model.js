
const {cities, breweries, featured} = require('./breweries.mongo');

let DEFAULT_CITY='asheville';
let YESTERDAYS_CITY;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function transform(string) {
    return string.split(' ').map(word => capitalize(word)).join(' ');
  };

async function rotateCity() {
    YESTERDAYS_CITY = await getYesterdaysFeaturedCity();
    const citiesCount = await cities.count();
    const getFeaturedCity = async () => {
        const featuredCityId = Math.floor(Math.random() * citiesCount).toString();
        const city = await findCity({id: featuredCityId});
        if (city) {
            DEFAULT_CITY = city.name.toLowerCase();
            await loadFeaturedData();
        } else {
            await getFeaturedCity();
        };
    };
    await getFeaturedCity();
    return({Yesterday: YESTERDAYS_CITY, Today: DEFAULT_CITY})
};

async function getYesterdaysFeaturedCity() {
    const aFeaturedBrewery = await featured.findOne({});
    return aFeaturedBrewery?.city;
}

async function loadFeaturedData() {
    await clearDefaultBreweries();

    const featuredBreweryDocs = await breweries
        .find({city : transform(DEFAULT_CITY)});

    for (const featuredBreweryDoc of featuredBreweryDocs) {
        await saveFeaturedBrewery(featuredBreweryDoc);
    };
};

async function saveFeaturedBrewery(brewery) {
    await featured.findOneAndUpdate({
        id: brewery.id
    },
    brewery,
    {
        upsert: true
    });
};

async function clearDefaultBreweries() {
    if (YESTERDAYS_CITY) {
        await featured.deleteMany({
            city: transform(YESTERDAYS_CITY)
        });
    }
};

async function findCity(filter) {
    return await cities.findOne(filter);
};

module.exports = {
    rotateCity,
    getYesterdaysFeaturedCity
};