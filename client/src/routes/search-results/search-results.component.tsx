import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Typography from '@mui/material/Typography';

import CityTable from "../../components/city-table/city-table.component";

import useGetBreweries from "../../utils/hooks/use-get-breweries";

import { BreweryContext } from "../../context/brewery.context";
import { ClientContext } from "../../context/client.context";

import { transformLabel } from "../../utils";

const SearchResults = () => {
    const params = useParams()
    const {hasBreweries, searchCityBreweries} = useContext(BreweryContext);
    const  {locationErrorMsg} = useContext(ClientContext);

    const {getSearchCityBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(searchCityBreweries)) {
            const city = params.city as string
            getSearchCityBreweries({city: transformLabel(city)});
        };
    },[])

    return (
        <>
            { locationErrorMsg ? 
                <Typography>{`${locationErrorMsg}. Please return to home page.`}</Typography>
                : 
                <CityTable breweriesToRender={searchCityBreweries} />
            }
        </>
    )
};

export default SearchResults;