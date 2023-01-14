import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import useGetBreweries from '../../utils/hooks/use-get-breweries';
import { defaultSearchCityState } from '../../utils/types.utils';
import {STATES} from '../../assets/data/states.js';

const transformStateName = (stateName: string) => {
    return stateName.toLowerCase().replace(' ', '_')
}

const SearchBar = () => {
    const [searchParams, setSearchParams] = useState(defaultSearchCityState);
    const navigate = useNavigate();
    const {getSearchCityBreweries} = useGetBreweries();

    const onChangeSearchCity = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams({
          city: e.target.value,
          state: searchParams.state
        })
    }
    
    const onChangeSearchState = (e: SelectChangeEvent) => {
      setSearchParams({
        state: e.target.value,
        city: searchParams.city
      })    
    }

    const searchCity = async (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault()
      await getSearchCityBreweries(searchParams)
      const city = searchParams.city.replace(' ', '-').toLowerCase()
      setSearchParams(defaultSearchCityState)
      navigate(`/${city}`)
    }

    const renderMenuItems = () => {
        return [
          <MenuItem disabled value="">
           <em>State</em>
          </MenuItem>,
          ...STATES.map(state => (
            <MenuItem value={transformStateName(state.name)}>{state.abbreviation}</MenuItem>
          ))
        ]
    }
    
    return (
        <Box component='form' onSubmit={searchCity}>
          <FormControl fullWidth size='small' variant='standard' sx={{margin: '20px 0 0 30px', height: '50%'}}  >
            <Select
              displayEmpty
              id="demo-simple-select"
              value={searchParams.state}
              label="State"
              onChange={onChangeSearchState}
              sx={{color: 'white', width: '100%', opacity: '.5'}}
            >
              {
                  renderMenuItems()    
              }
            </Select>
          </FormControl>
          <TextField 
                  required
                  fullWidth
                  onChange={onChangeSearchCity}
                  value={searchParams.city}
                  size='small' 
                  inputProps={{sx: {color: 'white'}}} 
                  margin='dense' 
                  id="standard-basic" 
                  placeholder='City' 
                  variant="standard" 
                  sx={{margin: '10px 0 0 30px'}}
            />
            <Button type='submit' sx={{height: '0px'}}></Button>
        </Box>
    )
}

export default SearchBar