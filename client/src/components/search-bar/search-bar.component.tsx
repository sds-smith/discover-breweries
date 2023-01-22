import { useState, ChangeEvent, FormEvent } from 'react';
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

import { transformStateName } from '../../utils';

const SearchBar = ({styles={backgroundColor: 'unset', color: 'white', margin: 'unset'}}) => {
    const [searchParams, setSearchParams] = useState(defaultSearchCityState);
    const navigate = useNavigate();
    const {getSearchCityBreweries} = useGetBreweries();

    const onChangeSearchCity = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams({
          city: e.target.value,
          state: searchParams.state
        });
    };
    
    const onChangeSearchState = (e: SelectChangeEvent) => {
      setSearchParams({
        state: e.target.value,
        city: searchParams.city
      });
    };

    const searchCity = async (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const city = searchParams.city.replace(' ', '-').toLowerCase();
      await getSearchCityBreweries(searchParams);
      setSearchParams(defaultSearchCityState);
      navigate(`/${city}`);
    };

    const renderMenuItems = () => {
        return [
          <MenuItem key='placeholder' disabled value="">
           <em>State</em>
          </MenuItem>,
          ...STATES.map(state => (
            <MenuItem key={state.abbreviation} value={transformStateName(state.name)}>{state.abbreviation}</MenuItem>
          ))
        ];
    };
    
    return (
        <Box component='form' onSubmit={searchCity} sx={styles}>
          <FormControl size='small' variant='standard' sx={{margin: '20px 0 0 30px', width: '80%', height: '50%'}}  >
            <Select
              displayEmpty
              id="demo-simple-select"
              value={searchParams.state}
              label="State"
              onChange={onChangeSearchState}
              sx={{color: styles.color, width: '100%', opacity: '.5'}}
            >
              {
                  renderMenuItems()    
              }
            </Select>
          </FormControl>
          <TextField 
                  required
                  onChange={onChangeSearchCity}
                  value={searchParams.city}
                  size='small' 
                  inputProps={{sx: {color: styles.color}}} 
                  margin='dense' 
                  id="standard-basic" 
                  placeholder='City' 
                  variant="standard" 
                  sx={{margin: '10px 0 0 30px', width: '80%'}}
            />
            <Button type='submit' sx={{height: '0px'}}></Button>
        </Box>
    );
};

export default SearchBar;