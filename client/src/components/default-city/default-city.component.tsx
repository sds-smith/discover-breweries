import { useEffect, useContext } from "react";

import CityTable from "../city-table/city-table.component";
import useGetBreweries from "../../utils/hooks/use-get-breweries";
import { BreweryContext } from "../../context/brewery.context";

const DefaultCity = () => {
    const {defaultBreweries, hasBreweries, loading} = useContext(BreweryContext);
    const {getDefaultBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(defaultBreweries) && !loading) {
            getDefaultBreweries();
        };
    }, []);

    return (
        <CityTable breweriesToRender={defaultBreweries} where='in'/>
    );
};

export default DefaultCity;