const { mongoConnect } = require("./mongo");
const { rotateCity, getYesterdaysFeaturedCity } = require("./breweries/breweries.model");

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    await mongoConnect();
    const cities = await rotateCity();

    const response = {
      statusCode: 200,
      body: cities
    };
    return response;
};
