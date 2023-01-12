import {FC} from 'react';
import SportsBarSharpIcon from '@mui/icons-material/SportsBarSharp';

import './map-marker.styles.scss';

type MarkerProps = {
    text: string,
    lat: number,
    lng: number
}

const Marker: FC<MarkerProps> = ({ text }) => {
    return (
        <div className='markerContainer'>
            <SportsBarSharpIcon fontSize={'large'} color="primary" />
            <div className='label'>{text}</div>
        </div>

    )
}

export default Marker