import {FC} from 'react';
import SportsBarSharpIcon from '@mui/icons-material/SportsBarSharp';
import { MarkerContainer, Label } from './map-marker.styles';

type MarkerProps = {
    text: string,
    lat: number,
    lng: number
};

const Marker: FC<MarkerProps> = ({ text }) => {
    return (
        <MarkerContainer>
            <SportsBarSharpIcon fontSize={'large'} color="primary" />
            <Label variant="caption">{text}</Label>
        </MarkerContainer>
    );
};

export default Marker;