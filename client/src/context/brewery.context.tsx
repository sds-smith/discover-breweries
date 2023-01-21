import { useState, createContext, FC } from 'react';
import {BreweryContextProps, ProviderProps} from '../utils/context.utils';
import { BreweryArray } from '../utils/types.utils';

export const BreweryContext = createContext<BreweryContextProps>({
    defaultBreweries: [null],
    setDefaultBreweries: ()=>{},
    breweriesNearMe: [null],
    setBreweriesNearMe: ()=>{},    
    searchCityBreweries: [null],
    setSearchCityBreweries: ()=>{},
    loadText: '',
    setLoadText: ()=>{},    
    defaultCity: '',
    setDefaultCity: ()=>{},
    hasBreweries: ()=>false
});

export const DEFAULT_LOAD_TEXT = 'Loading...'

export const BreweryProvider: FC<ProviderProps> = ({children}) => {
    const [defaultBreweries, setDefaultBreweries] = useState<BreweryArray>([null]);
    const [breweriesNearMe, setBreweriesNearMe] = useState<BreweryArray>([null]);
    const [searchCityBreweries, setSearchCityBreweries] = useState<BreweryArray>([null]);
    const [loadText, setLoadText] = useState<string>(DEFAULT_LOAD_TEXT);
    const [defaultCity, setDefaultCity] = useState<string>('')

    const hasBreweries = (array: BreweryArray): boolean => {
        return array[0] !== null
    }

    const value = {
        defaultBreweries,
        setDefaultBreweries,
        breweriesNearMe,
        setBreweriesNearMe,
        searchCityBreweries, 
        setSearchCityBreweries,
        loadText,
        setLoadText,
        defaultCity,
        setDefaultCity,
        hasBreweries
    }

    return <BreweryContext.Provider value={value}>{children}</BreweryContext.Provider>
}