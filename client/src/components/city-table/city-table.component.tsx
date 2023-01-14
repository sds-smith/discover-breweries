import {useState, useEffect, useContext, FC} from 'react';

import CityTableRow from '../table-row/table-row.component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';


import { BreweryContext } from '../../context/brewery.context';
import { BreweryArray } from '../../utils/types.utils';

import './city-table.styles.scss';

type CityTableProps = {
    breweriesToRender: BreweryArray
}

const CityTable: FC<CityTableProps> = ({breweriesToRender}) => {
    const [city, setCity] = useState('');
    const [page, setPage] = useState(1);
    
    const {hasBreweries, loadText} = useContext(BreweryContext);

    const pageSize = 8
    const numPages = Math.ceil(breweriesToRender.length / pageSize)
    const end = page * pageSize
    const start = end - pageSize

    const renderButtons = () => {
        const buttons = []
        for (let i = 1; i <= numPages; i++) {
            const fontWeight = i === page ? 'bold' : 'unset';
            const textDecoration = i === page ? 'underline' : 'unset';
            buttons.push(
                <Button onClick={()=>setPage(i)} sx={{fontWeight, textDecoration}} >{`Page ${i}`}</Button>
            )
        }
        return buttons
    }


    useEffect(() => {
            breweriesToRender[0] && setCity(breweriesToRender[0].city)
    }, [breweriesToRender]);

    return (
        <>
            { hasBreweries(breweriesToRender) ? (
                <TableContainer >     
                    <Typography variant='h4' component='h2'>{`Breweries near ${city}`}</Typography>
                    <Table component={Paper} elevation={12} sx={{width: '80vw', tableLayout: 'fixed', margin: '20px auto'}} >
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
                            breweriesToRender.slice(start, end).map((brewery, index)=> {
                                if (brewery !== null) {
                                    return <CityTableRow key={`${brewery.id}${index}`} brewery={brewery} />
                                }
                            })
                        }
                        </TableBody>
                    </Table>
                    <ButtonGroup variant="text" aria-label="text button group" sx={{marginLeft: '10vw'}}>
                        {
                            renderButtons()
                        }
                    </ButtonGroup>
                </TableContainer >
            ) : (
                <Typography variant='h4' component='h2'>{loadText}</Typography>
            )}
        </>
    );
};

export default CityTable;