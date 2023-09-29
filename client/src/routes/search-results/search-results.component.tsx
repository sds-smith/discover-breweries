import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import ErrorMessage from "../../components/error-message/error-message.component";
import CityTable from "../../components/city-table/city-table.component";
import useGetBreweries from "../../utils/hooks/use-get-breweries";
import { BreweryContext } from "../../context/brewery.context";
import { transformLabel } from "../../utils";

const SearchResults = () => {
    const params = useParams()
    const {loading, hasBreweries, searchCityBreweries, searchErrorMsg} = useContext(BreweryContext);

    const {getSearchCityBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(searchCityBreweries) && !loading) {
            const city = params.city as string
            getSearchCityBreweries({city: transformLabel(city)});
        };
    },[])

    return (
        <>
            { searchErrorMsg ? 
                <ErrorMessage errorMsg={searchErrorMsg} errorType='search'/>
                : 
                <CityTable breweriesToRender={searchCityBreweries} where='in' />
            }
        </>
    )
};

export default SearchResults;