import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { httpgetDefaultBreweries, httpGetMyLocalBreweries, httpGetBreweryLatLong, httpGetSearchCityBreweries } from "../http/requests";
import { ClientContext } from "../../context/client.context";
import { BreweryContext } from "../../context/brewery.context";
import useTrackLocation from './use-track-location';

import { GetBreweryResponseType, defaultBreweryState, defaultCenter } from "../types.utils";


const useGetBreweries = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [breweriesError, setBreweriesError] = useState('');

    const {clientLatLong} = useContext(ClientContext);
    const {hasBreweries, defaultBreweries, setDefaultBreweries, breweriesNearMe, setBreweriesNearMe, searchCityBreweries, setSearchCityBreweries, setLoadText} = useContext(BreweryContext);

    const {handleTrackLocation} = useTrackLocation();

    const getDefaultBreweries = async () => {
      try {
          const breweries = await httpgetDefaultBreweries();
          setDefaultBreweries(breweries)
      } catch (err) {
          if (err instanceof Error) {
              console.log(err.message)
            } else if (typeof err === 'string') {
              console.log(err)
            } else {
              console.log(`Error getting breweries ${err}`)
            }
      }
    };

    const getSearchCityBreweries = async (city: string) => {
      try {
        const response = await httpGetSearchCityBreweries(city)
        const {message, breweries} = response
        if (message === 'Breweries Retrieved') {
          setSearchCityBreweries(breweries)
          setBreweriesError('')
          setLoadText('Loading...')
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
      navigate(`/${city}`)
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
                setLoadText('Loading...')
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
        }
        if (brewery && !brewery.latitude || brewery && !brewery.longitude) {
          const getGeoCode = async () => {
              try {
                  const geoResponse = await httpGetBreweryLatLong(brewery.postal_code)
                  return {
                    brewery,
                    center: geoResponse.data
                  } as GetBreweryResponseType
              } catch(err) {
                  console.log(err);
                  return {
                    brewery,
                    center: {lat: 0, lng: 0}
                  } as GetBreweryResponseType
              }
          };
          getGeoCode();
      } else {
          if (brewery) {
            return {
              brewery, 
              center: {
                lat: Number(brewery.latitude),
                lng: Number(brewery.longitude)
              }
            } as GetBreweryResponseType
          }
          return {
            brewery: defaultBreweryState,
            center: defaultCenter
          } as GetBreweryResponseType
      }
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