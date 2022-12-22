import {useState, useEffect, useContext} from 'react';

import TableRow from '../table-row/table-row.component';

import { BreweryContext } from '../../context/brewery.context';

import './city-table.styles.scss'

const CityTable = (props) => {
    const [city, setCity] = useState('');
    const [breweries, setBreweries] = useState([]);

    const {ashevilleBreweries, breweriesNearMe} = useContext(BreweryContext);

    useEffect(() => {
        if (props.city) {
            setCity(props.city)
            setBreweries(ashevilleBreweries);
        } else {
            setCity(breweriesNearMe[0].city)
            setBreweries(breweriesNearMe)
        }
    })

    return (
        <div>
            <h2>{props.city ? `${city} Breweries` : `Breweries near ${city}`}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name (click a brewery name to view more)</th>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Website (click to visit)</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    breweries.map(brewery => (
                            <TableRow key={brewery.id} brewery={brewery} />
                        ) 
                    )
                }
                </tbody>

            </table>
        </div>

    )
}

export default CityTable