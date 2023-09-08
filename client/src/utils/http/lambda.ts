import axios from 'axios';
import { SearchCityType } from '../types.utils';

const API_BASE_URL='v1';
const AWS_API_URL = 'https://3vd325v5vc.execute-api.us-east-1.amazonaws.com/default'

export async function httpGetSearchCityBreweries(city: SearchCityType) {
    let queryString = '';
    if (city.city !== null && city.city !== undefined && city.city !== '') queryString += `city=${city.city}`;
    if (city.state !== null && city.state !== undefined && city.state !== '') {
        if (queryString.length > 0) queryString += '&';
        queryString += `state=${city.state}`
    };
    try {
        const response = await axios.post(`${AWS_API_URL}/discover-breweries_getSearchCityBreweries?${queryString}`)
        return await response.data
    } catch (err) {
        return err
    }
};

export async function httpgetDefaultBreweries() {
    try {
        const response = await axios.get(`${AWS_API_URL}/discover-breweries_getFeaturedBreweries`)
        return await response.data
    } catch (err) {
        return err
    }
};