import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BreweryContext } from '../../context/brewery.context';
import { capitalizeAll, encodePath } from '../../utils';
import { BreweryType } from '../../utils/types.utils';
import { CityGridContainer, CustomGrid } from './city-grid.styles';

const CityGrid = () => {
    const {defaultBreweries, defaultCity, setSelectedBrewery} = useContext(BreweryContext);

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('lg'));

    const brewerySlice = mobile ? 3 : 9;

    const selectBrewery = (brewery: BreweryType) => {
        setSelectedBrewery(brewery)
    }

    return (
        <CityGridContainer component={Paper} elevation={2} >
            <h2>
               {' Explore Today\'s Featured City: '}
                <Link component={RouterLink} to={encodePath(defaultCity)}>{capitalizeAll(defaultCity)}</Link>
            </h2>
            <CustomGrid container spacing={3}>
                {
                    defaultBreweries.slice(0, brewerySlice).map(brewery => {
                        if (brewery !== null) {
                            return (
                                <Grid item xs={12} lg={4} key={brewery.id}>
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
                {
                    defaultBreweries.length > brewerySlice &&
                    <Grid item xs={4}>
                        <Link component={RouterLink} to={encodePath(defaultCity)}>more . . .</Link>
                    </Grid>

                }
            </CustomGrid>
        </CityGridContainer>
    )
};

export default CityGrid;