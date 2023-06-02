import { useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { BreweryContext } from '../../context/brewery.context';
import useGetBreweries from '../../utils/hooks/use-get-breweries';

import { capitalizeAll, encodePath } from '../../utils';
import { BreweryType } from '../../utils/types.utils';

import { CityGridContainer, CustomGrid } from './city-grid.styles';

const CityGrid = () => {
    const {defaultBreweries, defaultCity, hasBreweries, setSelectedBrewery} = useContext(BreweryContext);
    const {getDefaultBreweries} = useGetBreweries();

    const selectBrewery = (brewery: BreweryType) => {
        setSelectedBrewery(brewery)
    }
    useEffect(() => {
        if (!hasBreweries(defaultBreweries)) {
            getDefaultBreweries();
        };
    }, []);

    return (
        <CityGridContainer elevation={2} >
            <h2>
               {' Explore Today\'s Featured City: '}
                <Link component={RouterLink} to={encodePath(defaultCity)}>{capitalizeAll(defaultCity)}</Link>
            </h2>
            <CustomGrid container spacing={1}>
                {
                    defaultBreweries.slice(0,9).map(brewery => {
                        if (brewery !== null) {
                            return (
                                <Grid item xs={4}>
                                    <div >
                                        <Link 
                                            component={RouterLink} 
                                            to={`${encodePath(defaultCity)}/${brewery.id}`}
                                            onClick={() => selectBrewery(brewery)}
                                        >
                                            {brewery.name}
                                        </Link>
                                    </div>
                                </Grid>
                            )
                        }
                    })
                }
                <Grid item xs={4}>
                    <Link component={RouterLink} to={encodePath(defaultCity)}>more . . .</Link>
                </Grid>

            </CustomGrid>
        </CityGridContainer>

    )
};

export default CityGrid;