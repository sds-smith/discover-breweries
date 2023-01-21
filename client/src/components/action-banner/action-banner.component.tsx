
import Box from '@mui/material/Box';

import SearchBar from "../search-bar/search-bar.component";
import ButtonBreweriesNearMe from '../button-breweries-near-me/button-breweries-near-me.component';

import { ActionBannerContainer, CustomSearchBar } from './action-banner.styles';

const ActionBanner = () => {
    return (
            <ActionBannerContainer elevation={12} >
                <Box>
                    <h2>Explore any City</h2>
                    <SearchBar styles={{backgroundColor: '#e0e0e0', color: 'black', margin: '20px 0'}}  />
                </Box>
                <Box>
                    <h2>Explore Nearby Breweries</h2>
                    <ButtonBreweriesNearMe variant="contained" />
                </Box>
            </ActionBannerContainer>
    )
};

export default ActionBanner;