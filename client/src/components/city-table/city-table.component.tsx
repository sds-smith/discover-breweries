import {useState, useEffect, useContext, FC} from 'react';

import CityTableRow from '../table-row/table-row.component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

import { BreweryContext } from '../../context/brewery.context';
import { BreweryArray } from '../../utils/types.utils';

import './city-table.styles.scss';

type CityTableProps = {
    breweriesToRender: BreweryArray
}

const CityTable: FC<CityTableProps> = ({breweriesToRender}) => {
    const [city, setCity] = useState('');
    
    const {hasBreweries, loadText} = useContext(BreweryContext);

    useEffect(() => {
            breweriesToRender[0] && setCity(breweriesToRender[0].city)
    }, [breweriesToRender]);

    return (
        <>
            { hasBreweries(breweriesToRender) ? (
                <TableContainer >     
                    <Typography variant='h4' component='h2'>{`Breweries near ${city}`}</Typography>
                    <Table component={Paper} elevation={12} sx={{width: '80%', height: '50vh', overflow: 'scroll', margin: '20px auto'}} >
                        <TableHead >
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Website</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                            breweriesToRender.map((brewery)=> {
                                if (brewery !== null) {
                                    return <CityTableRow key={brewery.id} brewery={brewery} />
                                }
                            })
                        }
                        </TableBody>
                    </Table>
                </TableContainer >
            ) : (
                <Typography variant='h4' component='h2'>{loadText}</Typography>
            )}
        </>
    );
};

export default CityTable;