import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ElementType } from "react";

type CityGridContainerProps = {
    component: ElementType;
    elevation: number
}

export const CityGridContainer = styled(Grid)<CityGridContainerProps>`
    width: 80%;
    margin: 50px auto;
    padding: 50px;
    background-color: rgba(255, 255, 255, .2)
`

export const CustomGrid = styled(Grid)`
    margin: 10px auto;
`