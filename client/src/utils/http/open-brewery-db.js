import axios from 'axios';

const OPEN_BREWERY_DB_BASE_URL = 'https://api.openbrewerydb.org/breweries';

export async function httpGetMyLocalBreweries(clientLatLong) {
    try {
        const response = await axios.get(`${OPEN_BREWERY_DB_BASE_URL}?by_dist=${clientLatLong}`);
        const breweries = await response.data;
        const {breweriesToReturn} = await transformBreweryData(breweries)
        return {
            message: "Breweries Retrieved",
            breweries: breweriesToReturn
        }
    } catch(err) {
        return {
            message: err.message
        }
    }
};

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