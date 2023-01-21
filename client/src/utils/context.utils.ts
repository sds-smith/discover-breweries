import { ReactNode } from "react";
import { BreweryArray } from "./types.utils";


export type BreweryContextProps = {
    defaultBreweries: BreweryArray;
    setDefaultBreweries(defaultBreweries: BreweryArray): void;
    breweriesNearMe: BreweryArray;
    setBreweriesNearMe(breweriesNearMe: BreweryArray): void;    
    searchCityBreweries: BreweryArray;
    setSearchCityBreweries(searchCityBreweries: BreweryArray): void;
    loadText: string;
    setLoadText(loadText: string): void;    
    defaultCity: string;
    setDefaultCity(defaultCity: string): void;
    hasBreweries(array: BreweryArray): boolean
}

export type ClientContextProps = {
    clientLatLong: string;
    setClientLatLong(clientLatLong: string): void;
    locationErrorMsg: string;
    setLocationErrorMsg(locationErrorMsg: string): void;
}

export type ProviderProps = {
    children?: ReactNode
}
