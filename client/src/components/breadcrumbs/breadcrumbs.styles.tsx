import { ForwardRefExoticComponent } from "react";
import { LinkProps } from "react-router-dom";
import styled from "@emotion/styled";
import Link from '@mui/material/Link';

type BreadcrumbLinkProps = {
    component?: ForwardRefExoticComponent<LinkProps>;
    to?: string;
}

export const BreadcrumbLink = styled(Link)<BreadcrumbLinkProps>`
 text-decoration: none;

 &:hover {
    text-decoration: underline;
};

&:visited {
    color: black;
}
`