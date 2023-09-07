const { mongoConnect } = require("./mongo");
const { getFeaturedBreweries } = require("./breweries/breweries.model");

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await mongoConnect();
    const {DEFAULT_CITY, breweries} = await getFeaturedBreweries();

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: DEFAULT_CITY,
      DEFAULT_CITY,
      breweries
    };
    return response;
};
