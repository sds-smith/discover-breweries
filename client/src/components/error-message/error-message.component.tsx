import { useContext, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ClientContext } from '../../context/client.context';
import { BreweryContext } from '../../context/brewery.context';

type ErrorMessageProps = {
    errorMsg: string;
    errorType: string
};

const ErrorMessage: FC<ErrorMessageProps> = ({errorMsg, errorType}) => {
    const navigate = useNavigate();
    const {setLocationErrorMsg} = useContext(ClientContext);
    const {setSearchErrorMsg} = useContext(BreweryContext);

    const errorTypeActions = {
        location: setLocationErrorMsg,
    }

    const goHome = () => {
        // errorTypeActions[errorType]('');
        if (errorType === 'location') setLocationErrorMsg('');
        if (errorType === 'search') setSearchErrorMsg('')
        navigate('/');
      };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: {xs: '90%', lg: '40%'}, justifyContent: 'center', margin: '40px auto'}}>
            <Typography variant="h4" >{`${errorMsg}.`}</Typography>
            {
                errorType === 'location' &&
                <Typography variant="h6" >You may need to adjust your device location settings to use this feature.</Typography>
            }
            <Button onClick={goHome} variant="contained" sx={{margin: '30px auto'}}>Return Home</Button>
        </Box>
        )
};

export default ErrorMessage;