import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton';
import BeerIcon from '../../assets/Beer-icon.png'
import SearchBar from '../search-bar/search-bar.component';
import useGetBreweries from '../../utils/hooks/use-get-breweries';

import './header.styles.scss'

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const { getMyLocalBreweries } = useGetBreweries()

  const goHome = () => {
    navigate('/')
  }




  const breweriesNearMe = async () => {
    await getMyLocalBreweries()
    navigate('/breweries-near-me')
  }

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
            <SearchBar />
          </Box>
          <ButtonGroup variant='text' aria-label="text button group" >
            <Button onClick={goHome} color="inherit">Home</Button>
            <Divider orientation='vertical' />
            <Button onClick={breweriesNearMe} color="inherit">Find Breweries Near Me</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}