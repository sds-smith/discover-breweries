import { FC } from "react";
import {Link as RouterLink} from 'react-router-dom'

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link'

import { BreweryType } from "../../utils/types.utils";

import './table-row.styles.scss';

type TableRowProps = {
    brewery: BreweryType
}

const CityTableRow: FC<TableRowProps> = ({brewery}) => {
    const {id, name, brewery_type, street, city, state, postal_code, website_url} = brewery;

    return (
        <TableRow >
            <TableCell><Link component={RouterLink} className='tableLink' to={id}>{name}</Link></TableCell>
            <TableCell>{brewery_type}</TableCell>
            <TableCell>{`${street} ${city}, ${state} ${postal_code}`}</TableCell>
            <TableCell>
                <Link className='tableLink' href={website_url} target='_blank' rel='no-referrer'>{website_url}</Link>
            </TableCell>
        </TableRow>
    )
}

export default CityTableRow