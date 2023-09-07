import axios from 'axios';
import { SearchCityType } from '../types.utils';

const API_BASE_URL='v1';

export async function httpGetSearchCityBreweries(city: SearchCityType) {
    let queryString = '';
    if (city.city !== null && city.city !== undefined && city.city !== '') queryString += `city=${city.city}`;
    if (city.state !== null && city.state !== undefined && city.state !== '') {
        if (queryString.length > 0) queryString += '&';
        queryString += `state=${city.state}`
    };
    try {
        const response = await axios.get(`${API_BASE_URL}/breweries/search?${queryString}`)
        return await response.data
    } catch (err) {
        return err
    }
};

export async function httpgetDefaultBreweries() {
    try {
        const response = await axios.get(`${API_BASE_URL}/breweries/default_city`)
        return await response.data
    } catch (err) {
        return err
    }
};