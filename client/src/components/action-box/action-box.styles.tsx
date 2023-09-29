import styled from "@emotion/styled";
import Grid from '@mui/material/Grid';
import SearchBar from "../search-bar/search-bar.component";
import { ElementType } from "react";

type ActionBoxContainerProps = {
    component: ElementType;
    elevation: number
}

type BreweriesNearMeContainerProps = {
    align: string;
}

export const ActionBoxContainer = styled(Grid)<ActionBoxContainerProps>`
    width: 80%;
    minHeight: 18vh;
    margin: 50px auto;
    padding: 30px 10%;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, .2)
`

export const BreweriesNearMeContainer = styled(Grid)<BreweriesNearMeContainerProps>`

`

export const CustomSearchBar = styled(SearchBar)`
    background-color: gray;
    opacity: 50%;
`