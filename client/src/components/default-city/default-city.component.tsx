import { useEffect, useContext } from "react";

import CityTable from "../city-table/city-table.component";
import useGetBreweries from "../../utils/hooks/use-get-breweries";
import { BreweryContext } from "../../context/brewery.context";

const DefaultCity = () => {
    const {defaultBreweries, hasBreweries} = useContext(BreweryContext);
    const {getDefaultBreweries} = useGetBreweries()

    useEffect(() => {
        if (!hasBreweries(defaultBreweries)) {
            getDefaultBreweries()
        }
    }, []);

    return (
        <CityTable breweriesToRender={defaultBreweries}/>
    )
}

export default DefaultCity