import { FC, useContext } from "react";
import {Link as RouterLink} from 'react-router-dom';


import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { BreweryContext } from "../../context/brewery.context";
import { BreweryType } from "../../utils/types.utils";
import { TableLink, CustomTableBody } from "./table-row.styles";

type TableRowProps = {
    brewery: BreweryType
}

const CityTableRow: FC<TableRowProps> = ({brewery}) => {
    const {id, name, brewery_type, street, city, state, postal_code, website_url} = brewery;
    const {setSelectedBrewery} = useContext(BreweryContext);

    const selectBrewery = () => {
        setSelectedBrewery(brewery)
    }
    
    return (
        <TableRow sx={{height: '50px'}} >
            <TableCell onClick={selectBrewery} sx={{height: '50px'}}>
                <TableLink component={RouterLink} to={id}>{name}</TableLink>
            </TableCell>
            <TableCell sx={{height: '50px', width: '20%'}}>{brewery_type}</TableCell>
            <TableCell sx={{height: '50px', display: { xs: 'none', lg: 'flex' }}}>{`${street} ${city}, ${state} ${postal_code}`}</TableCell>
            <TableCell sx={{height: '50px'}}>
                <TableLink href={website_url} target='_blank' rel='no-referrer'>{website_url}</TableLink>
            </TableCell>
        </TableRow>
    )
}

export default CityTableRow