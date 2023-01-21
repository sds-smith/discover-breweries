import { useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { BreweryContext } from '../../context/brewery.context';
import useGetBreweries from '../../utils/hooks/use-get-breweries';

import { CityGridContainer, CustomGrid } from './city-grid.styles';

function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const CityGrid = () => {
    const {defaultBreweries, defaultCity, hasBreweries} = useContext(BreweryContext);
    const {getDefaultBreweries} = useGetBreweries();

    useEffect(() => {
        if (!hasBreweries(defaultBreweries)) {
            getDefaultBreweries();
        };
    }, []);

    return (
        <CityGridContainer >
            <h2>
               {' Explore Today\'s Featured City: '}
                <Link component={RouterLink} to={defaultCity}>{capitalize(defaultCity)}</Link>
            </h2>
            <CustomGrid container spacing={1}>
                {
                    defaultBreweries.slice(0,9).map(brewery => {
                        if (brewery !== null) {
                            return (
                                <Grid item xs={4}>
                                    <Link component={RouterLink} to={`${defaultCity}/${brewery.id}`}>{brewery.name}</Link>
                                </Grid>
                            )
                        }
                    })
                }
                <Grid item xs={4}>
                    <Link component={RouterLink} to={defaultCity}>more . . .</Link>
                </Grid>

            </CustomGrid>
        </CityGridContainer>

    )
};

export default CityGrid;