import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton';
import BeerIcon from '../../assets/Beer-icon.png'
import useGetBreweries from '../../utils/hooks/use-get-breweries';

import './header.styles.scss'

export default function ButtonAppBar() {
  const [cityToSearch, setCityToSearch] = useState('')
  const navigate = useNavigate()
  const { getMyLocalBreweries, getSearchCityBreweries } = useGetBreweries()

  const goHome = () => {
    navigate('/')
  }

  const searchCity = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    await getSearchCityBreweries(cityToSearch)
    const city = cityToSearch.replace(' ', '-').toLowerCase()
    setCityToSearch('')
    navigate(`/${city}`)
  }

  const onChangeSearchCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCityToSearch(e.target.value)
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
          <Box component='form'onSubmit={searchCity} sx={{display: 'flex', alignItems: 'center', height: '100%', flexGrow: 1 }}>
            <Typography variant="h6" component="div" >
              Discover Breweries
            </Typography>
            <TextField 
              onChange={onChangeSearchCity}
              value={cityToSearch}
              size='small' 
              inputProps={{sx: {color: 'white'}}} 
              margin='dense' 
              id="standard-basic" 
              placeholder='search any city' 
              variant="standard" 
              sx={{margin: '10px'}} 
            />
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