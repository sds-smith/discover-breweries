import { useState, useEffect, useContext } from 'react';
import BreweryMap from '../brewery-map/brewery-map.component';
import useGetBreweries from '../../utils/hooks/use-get-breweries';
import { ClientContext } from '../../context/client.context';
import { BreweryType, CenterType, defaultBreweryState, defaultCenter, GetBreweryResponseType } from '../../utils/types.utils';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { encodeMapParams } from '../../utils';

export default function MediaCard() {
    const [brewery, setBrewery] = useState<BreweryType>(defaultBreweryState);
    const [center, setCenter] = useState<CenterType>(defaultCenter);
 
    const {name, street, city, state, postal_code, website_url} = brewery;

    const {getBrewery} = useGetBreweries();

    const {clientLatLong} = useContext(ClientContext);
    const google_maps_base_url = clientLatLong ? 
      `https://www.google.com/maps/dir/${clientLatLong}/` :
      'https://www.google.com/maps/place/';

    const mapParams = street && city && state && postal_code ? encodeMapParams(street,city,state,postal_code) : '';

    useEffect(() => {
        const {brewery, center} = getBrewery() as GetBreweryResponseType;
        brewery && setBrewery(brewery);
        center && setCenter(center);
    }, []);

  return (
    <Card raised sx={{ maxWidth: '80vw', margin: '80px auto' }}>
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
        <Button size="small">
          <Link href={website_url} target='_blank' rel='no-referrer'>
            View Website
          </Link>
        </Button>
        <Button size="small">
          <Link href={`${google_maps_base_url}${mapParams}`} target='_blank' rel='no-referrer'>
            Get Directions
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

