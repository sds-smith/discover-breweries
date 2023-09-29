import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from "../search-bar/search-bar.component";
import ButtonBreweriesNearMe from '../button-breweries-near-me/button-breweries-near-me.component';
import { ActionBoxContainer, BreweriesNearMeContainer } from './action-box.styles';

const ActionBox = () => {
    return (
        <ActionBoxContainer container spacing={3} component={Paper} elevation={2} >
            <Grid item xs={12} lg={6} >
                <h2>Explore any City</h2>
                <SearchBar styles={{backgroundColor: '#e0e0e0', color: 'black', margin: '20px 0'}}  />
            </Grid>               
            <BreweriesNearMeContainer item xs={12} lg={6} align='center' >
                <h2>Explore Nearby Breweries</h2>
                <ButtonBreweriesNearMe variant="contained" />
            </BreweriesNearMeContainer>
        </ActionBoxContainer>
    )
};

export default ActionBox;