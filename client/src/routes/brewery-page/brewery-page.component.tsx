import { useNavigate } from 'react-router-dom';
import BreweryCard from '../../components/brewery-card/mui-card.component';

import './brewery-page.styles.scss';

const BreweryPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    return (
        <div className='breweryPageContainer'>
            <BreweryCard />
        </div>

    )
};

export default BreweryPage;