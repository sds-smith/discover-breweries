import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchBar from '../search-bar/search-bar.component';
import ButtonBreweriesNearMe from '../button-breweries-near-me/button-breweries-near-me.component';
import BeerIcon from '../../assets/Beer-icon.png';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={goHome}
          >
            <img src={BeerIcon}/>
          </IconButton>
          <Box sx={{display: 'flex', alignItems: 'center', height: '100%', flexGrow: 1 }}>
            <Typography variant="h6" component="div" >
              Discover Breweries
            </Typography>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }}}>
              <SearchBar />
            </Box>
          </Box>
          <ButtonGroup variant='text' aria-label="text button group" >
            <Button onClick={goHome} color="inherit" sx={{margin: '30px auto'}}>Home</Button>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }}}>
              <ButtonBreweriesNearMe variant='text' />
            </Box>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};