import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const BreadcrumbLink = styled(Link)`
 text-decoration: none;

 &:hover {
    text-decoration: underline;
};

&:visited {
    color: black;
}
`