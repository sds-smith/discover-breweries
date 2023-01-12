import * as React from 'react';

import { useState, useEffect } from 'react';
import BreweryMap from '../brewery-map/brewery-map.component';
import useGetBreweries from '../../utils/hooks/use-get-breweries';

import { BreweryType, CenterType, defaultBreweryState, defaultCenter, GetBreweryResponseType } from '../../utils/types.utils';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {

    const [brewery, setBrewery] = useState<BreweryType>(defaultBreweryState);
    const [center, setCenter] = useState<CenterType>(defaultCenter);
 
    const {name, street, city, state, postal_code} = brewery;

    const {getBrewery} = useGetBreweries();

    useEffect(() => {
        const {brewery, center} = getBrewery() as GetBreweryResponseType;

        brewery && setBrewery(brewery);
        center && setCenter(center);
    }, [])

  return (
    <Card raised sx={{ maxWidth: '80vw', margin: '40px auto' }}>
      <BreweryMap center={center} name={name} zoom={15}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {street}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${city}, ${state}, ${postal_code}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Website</Button>
        <Button size="small">Get Directions</Button>
      </CardActions>
    </Card>
  );
}