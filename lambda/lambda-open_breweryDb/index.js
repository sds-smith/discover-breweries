const axios = require('axios')

const OPEN_BREWERY_DB_BASE_URL = 'https://api.openbrewerydb.org/breweries';

exports.handler = async (event) => {

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

  const hanoverBreweries = await getBreweries('Hanover')

    const response = {
      statusCode: 200,
      body: hanoverBreweries
    };
    return response;
};
