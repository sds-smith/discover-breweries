import { ElementType } from "react";
import styled from "@emotion/styled";
import Grid from '@mui/material/Grid';

type TableBodyProps = {
    component?: ElementType;
}

export const CustomTableBody = styled(Grid)<TableBodyProps>`
    &:hover {
        font-weight: bold;
        font-style: italic;
    }
`