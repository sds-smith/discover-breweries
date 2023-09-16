import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import SearchBar from "../search-bar/search-bar.component";

export const ActionBoxContainer = styled(Paper)`
    width: 80%;
    margin: 50px auto;
    padding: 30px 10%;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, .2)
`

export const CustomSearchBar = styled(SearchBar)`
    background-color: gray;
    opacity: 50%;
`