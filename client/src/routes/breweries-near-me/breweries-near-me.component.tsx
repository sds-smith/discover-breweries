import { useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import CityTable from "../../components/city-table/city-table.component";
import ErrorMessage from "../../components/error-message/error-message.component";
import useGetBreweries from "../../utils/hooks/use-get-breweries";
import { BreweryContext } from "../../context/brewery.context";
import { ClientContext } from "../../context/client.context";

const BreweriesNearMe = () => {
    const {hasBreweries, breweriesNearMe, loading} = useContext(BreweryContext);
    const  {locationErrorMsg} = useContext(ClientContext);

    const {getMyLocalBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(breweriesNearMe) && !loading) {
            getMyLocalBreweries();
        };
    })

    return (
        <>
            { locationErrorMsg ? 
                <ErrorMessage errorMsg={locationErrorMsg} errorType='location'/>
                : 
                <CityTable breweriesToRender={breweriesNearMe} where='near' />
            }
        </>
    )
};

export default BreweriesNearMe;