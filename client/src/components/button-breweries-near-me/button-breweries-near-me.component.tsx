import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import useGetBreweries from '../../utils/hooks/use-get-breweries';

type ButtonBreweriesNearMeProps = {
    variant: "text" | "outlined" | "contained" | undefined;
};

const ButtonBreweriesNearMe: FC<ButtonBreweriesNearMeProps> = ({variant}) => {
    const navigate = useNavigate();
    const { getMyLocalBreweries } = useGetBreweries();

    const breweriesNearMe = async () => {
        await getMyLocalBreweries();
        navigate('/breweries-near-me');
      };

    return (
        <Button onClick={breweriesNearMe} variant={variant} color="inherit" sx={{margin: '30px auto'}}>Find Breweries Near Me</Button>
    )
};

export default ButtonBreweriesNearMe;