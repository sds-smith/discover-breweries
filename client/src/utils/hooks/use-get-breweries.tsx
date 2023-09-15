import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { httpGetMyLocalBreweries, httpgetDefaultBreweries, httpGetSearchCityBreweries } from "../http";
import { ClientContext } from "../../context/client.context";
import { BreweryContext, DEFAULT_LOAD_TEXT } from "../../context/brewery.context";
import useTrackLocation from './use-track-location';

import { GetBreweryResponseType, defaultBreweryState, defaultCenter, SearchCityType } from "../types.utils";


const useGetBreweries = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [breweriesError, setBreweriesError] = useState('');

    const {clientLatLong} = useContext(ClientContext);
    const { setLoading, setDefaultCity, defaultBreweries, setDefaultBreweries, breweriesNearMe, setBreweriesNearMe, searchCityBreweries, setSearchCityBreweries, setLoadText} = useContext(BreweryContext);
    
    const {handleTrackLocation} = useTrackLocation();

    const getDefaultBreweries = async () => {
      setLoading(true)
      try {
          const {breweries, DEFAULT_CITY} = await httpgetDefaultBreweries();
          setDefaultBreweries(breweries)
          setDefaultCity(DEFAULT_CITY)
      } catch (err) {
          if (err instanceof Error) {
              console.log(err.message)
            } else if (typeof err === 'string') {
              console.log(err)
            } else {
              console.log(`Error getting breweries ${err}`)
            }
      }
      setLoading(false)
    };

    const getSearchCityBreweries = async (city: SearchCityType) => {
      setLoading(true)
      setSearchCityBreweries([null])
      try {
        const response = await httpGetSearchCityBreweries(city)
        const {message, breweries} = response
        if (message === 'Breweries Retrieved') {
          setSearchCityBreweries(breweries)
          setBreweriesError('')
          setLoadText(DEFAULT_LOAD_TEXT)
        } else {
          setBreweriesError(message)
        }
      } catch (err) {
        if (err instanceof Error) {
          setBreweriesError(err.message)
        } else if (typeof err === 'string') {
          setBreweriesError(err)
        } else {
          setBreweriesError(`Error getting breweries ${err}`)
        }
      }
      setLoading(false)
    }

    const getMyLocalBreweries = async () => {
            handleTrackLocation()
            setLoadText('Fetching Breweries Data...')
            try {
               const response = await httpGetMyLocalBreweries(clientLatLong);
               const {message, breweries} = response
               if (message === 'Breweries Retrieved') {
                setBreweriesNearMe(breweries)
                setBreweriesError('')
                setLoadText(DEFAULT_LOAD_TEXT)
               } else {
                setBreweriesError(message)
               }
            } catch (err) {
              if (err instanceof Error) {
                setBreweriesError(err.message)
              } else if (typeof err === 'string') {
                setBreweriesError(err)
              } else {
                setBreweriesError(`Error getting breweries ${err}`)
              }
            }
      };

    const getBrewery = () => {
      const breweryIdToFind = params.id;
      const brewery = defaultBreweries.find(breweryToFind => breweryToFind !== null && breweryToFind.id === breweryIdToFind) ||
                      breweriesNearMe.find(breweryToFind => breweryToFind !== null && breweryToFind.id === breweryIdToFind) ||
                      searchCityBreweries.find(breweryToFind => breweryToFind !== null && breweryToFind.id === breweryIdToFind) ;
        if (!brewery) {
          navigate('/');
          return {
            brewery: defaultBreweryState,
            center: defaultCenter
          } as GetBreweryResponseType
        }
        return {
          brewery, 
          center: {
            lat: Number(brewery.latitude),
            lng: Number(brewery.longitude)
          }
        } as GetBreweryResponseType
    } 
    return {
        getDefaultBreweries,
        getMyLocalBreweries,
        getSearchCityBreweries,
        breweriesError,
        getBrewery
    };
};

export default useGetBreweries;