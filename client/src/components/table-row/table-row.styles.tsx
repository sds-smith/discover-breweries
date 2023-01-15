import { ForwardRefExoticComponent } from "react";
import { LinkProps } from "react-router-dom";import styled from "@emotion/styled";
import Link from '@mui/material/Link';

type TableLinkProps = {
    component?: ForwardRefExoticComponent<LinkProps>;
    to?: string;
}

export const TableLink = styled(Link)<TableLinkProps>`
    &:hover {
        font-weight: bold;
        font-style: italic;
    }
`