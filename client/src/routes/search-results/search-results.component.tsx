import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import CityTable from "../../components/city-table/city-table.component";

import useGetBreweries from "../../utils/hooks/use-get-breweries";

import { BreweryContext } from "../../context/brewery.context";
import { ClientContext } from "../../context/client.context";
import { BreweryArray } from "../../utils/types.utils";

const SearchResults = () => {
    const params = useParams()
    const {hasBreweries, searchCityBreweries} = useContext(BreweryContext);
    const  {locationErrorMsg} = useContext(ClientContext);

    const {getSearchCityBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(searchCityBreweries)) {
            const city = params.city as string
            getSearchCityBreweries(city);
        };
    },[])

    return (
        <div>
            { locationErrorMsg ? 
                <div>{`${locationErrorMsg}. Please return to home page.`}</div>
                : 
                <CityTable breweriesToRender={searchCityBreweries} />
            }
        </div>
    )
};

export default SearchResults;