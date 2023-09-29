import { ForwardRefExoticComponent, ElementType } from "react";
import { LinkProps } from "react-router-dom";
import styled from "@emotion/styled";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

type TableLinkProps = {
    component?: ForwardRefExoticComponent<LinkProps>;
    to?: string;
}

type TableBodyProps = {
    component?: ElementType;
}

export const TableLink = styled(Link)<TableLinkProps>`
    &:hover {
        font-weight: bold;
        font-style: italic;
    }
`

export const CustomTableBody = styled(Grid)<TableBodyProps>`
    &:hover {
        font-weight: bold;
        font-style: italic;
    }
`