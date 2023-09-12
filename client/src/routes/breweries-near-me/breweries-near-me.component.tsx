import { useEffect, useContext } from "react";

import Typography from '@mui/material/Typography';

import CityTable from "../../components/city-table/city-table.component";

import useGetBreweries from "../../utils/hooks/use-get-breweries";

import { BreweryContext } from "../../context/brewery.context";
import { ClientContext } from "../../context/client.context";

const BreweriesNearMe = () => {
    const {hasBreweries, breweriesNearMe} = useContext(BreweryContext);
    const  {locationErrorMsg} = useContext(ClientContext);

    const {getMyLocalBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(breweriesNearMe)) {
            getMyLocalBreweries();
        };
    })

    return (
        <>
            { locationErrorMsg ? 
                <Typography>{`${locationErrorMsg}. Please return to home page.`}</Typography>
                : 
                <CityTable breweriesToRender={breweriesNearMe} where='near' />
            }
        </>
    )
};

export default BreweriesNearMe;