import { useEffect, useContext } from "react";

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
        <div>
            { locationErrorMsg ? 
                <div>{`${locationErrorMsg}. Please return to home page.`}</div>
                : 
                <CityTable breweriesToRender={breweriesNearMe} />
            }
        </div>
    )
};

export default BreweriesNearMe;