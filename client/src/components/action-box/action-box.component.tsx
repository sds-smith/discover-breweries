import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from "../search-bar/search-bar.component";
import ButtonBreweriesNearMe from '../button-breweries-near-me/button-breweries-near-me.component';
import { ActionBoxContainer } from './action-box.styles';

const ActionBox = () => {
    return (
        <ActionBoxContainer container component={Paper} elevation={2} >
            <Grid item xs={12} lg={6} >
                <h2>Explore any City</h2>
                <SearchBar styles={{backgroundColor: '#e0e0e0', color: 'black', margin: '20px 0'}}  />
            </Grid>               
            <Grid item xs={12} lg={6} >
                <h2>Explore Nearby Breweries</h2>
                <ButtonBreweriesNearMe variant="contained" />
            </Grid>
        </ActionBoxContainer>
    )
};

export default ActionBox;