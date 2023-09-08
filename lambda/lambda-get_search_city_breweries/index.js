const { mongoConnect } = require("./mongo");
const { getSearchCityBreweries } = require("./breweries/breweries.model");

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    // return {
    //   statusCode: 200,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true,
    //   },
    //   body: 'message',
    //   city: event.city,
    //   state: event.state,
    //   event
    // };
    const {city, state} = event;

    await mongoConnect();
    const {breweries, message} = await getSearchCityBreweries(city, state);

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: message,
      breweries,
      message
    };
    return response;
};


