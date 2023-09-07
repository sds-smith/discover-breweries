require('dotenv').config();

const {cities, breweries, featured} = require('./breweries.mongo');
const { getAllBreweries, getBreweriesByCity } = require('../open-brewery-db/open-brewery-db.model')

let DEFAULT_CITY='asheville';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function transform(string) {
    return string.split(' ').map(word => capitalize(word)).join(' ')
  };

//Mongo Functions
async function loadCitiesData(breweryDocs) {
    const citiesCount = await cities.count();
    if (citiesCount) {
        CITIES_COUNT = citiesCount
        console.log('City data already loaded!');
    } else {
        await populateCitiesData(breweryDocs);
        CITIES_COUNT = await cities.count();
    };
};

async function loadBreweriesData() { 
    const checkBrewery = await findBrewery({});
    if (checkBrewery) {
        console.log('Brewery data already loaded!');
    } else {
        const {breweryDocs} = await populateBreweriesData();
        await loadFeaturedData(breweryDocs);
        await loadCitiesData(breweryDocs);
    };
};

async function loadFeaturedData(breweryDocs) {
    const checkFeatured = await findFeaturedBrewery({});
    if (checkFeatured) {
        console.log('Featured City data already loaded!')
    } else {
        const featuredBreweryDocs = breweryDocs.filter(doc => 
            doc.city === transform(DEFAULT_CITY));
        for (const featuredBreweryDoc of featuredBreweryDocs) {
            await saveFeaturedBrewery(featuredBreweryDoc)
        };
    };
};

async function populateCitiesData(breweryDocs) {
    console.log('Downloading cities data...');
    try {

        let id = 0;
        for (const breweryDoc of breweryDocs) {
            const {city} = breweryDoc;
            await saveCity({
                name: city,
                id
            });
            id ++
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

async function populateBreweriesData() {
    console.log('Downloading breweries data...');
    try {
        const breweryDocs = await getAllBreweries();

        for (const breweryDoc of breweryDocs) {
            await saveBrewery(breweryDoc)
        };
        return {
            ok: true,
            status: 201,
            breweryDocs
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

async function findCity(filter) {
    return await cities.findOne(filter)
};

async function findBrewery(filter) {
    return await breweries.findOne(filter)
};

async function findFeaturedBrewery(filter) {
    return await featured.findOne(filter)
};

async function saveCity(city) {
    const foundCity = await cities.findOne({
        name: city.name
    }).exec();
    if (!foundCity) {
        console.log(`saving ${city.name}`)
        await cities.findOneAndUpdate({
            name: city.name
        },
        city,
        {
            upsert: true
        });
        return true
    }
    return false
}

async function saveBrewery(brewery) {
    console.log(`saving ${brewery.name}`);
    await breweries.findOneAndUpdate({
        id: brewery.id
    },
    brewery,
    {
        upsert: true
    });
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

module.exports = {
    loadCitiesData,
    loadBreweriesData,
    getDefaultBreweries,
    getSearchCityBreweries
};