
import Box from '@mui/material/Box';

import SearchBar from "../search-bar/search-bar.component";
import ButtonBreweriesNearMe from '../button-breweries-near-me/button-breweries-near-me.component';

import { ActionBoxContainer } from './action-box.styles';

const ActionBox = () => {
    return (
        <ActionBoxContainer elevation={2} >
            <Box>
                <h2>Explore any City</h2>
                <SearchBar styles={{backgroundColor: '#e0e0e0', color: 'black', margin: '20px 0'}}  />
            </Box>
            <Box>
                <h2>Explore Nearby Breweries</h2>
                <ButtonBreweriesNearMe variant="contained" />
            </Box>
        </ActionBoxContainer>
    )
};

export default ActionBox;