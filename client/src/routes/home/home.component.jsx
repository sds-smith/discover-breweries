import {useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Asheville from "../../components/asheville/asheville.component";
import useTrackLocation from '../../hooks/use-track-location';
import { BreweryContext } from "../../context/brewery.context";
import { ClientContext } from "../../context/client.context";

const Home = () => {
    const [breweriesError, setBreweriesError] = useState('');
    const {handleTrackLocation} = useTrackLocation();
    const {breweriesNearMe, setBreweriesNearMe, hasBreweries} = useContext(BreweryContext);
    const {clientLatLong} = useContext(ClientContext)

    const navigate = useNavigate();

    const onClick = () => {
        console.log('click')
        handleTrackLocation()
    }

    useEffect(() => {
        const getMyLocalBreweries = async () => {
          if (clientLatLong) {
            try {
              const response = await axios.get(`/v1/breweries/by-distance?latLong=${clientLatLong}&per_page=30`)
              const breweries = await response.data
              setBreweriesNearMe(breweries)
              setBreweriesError('')
            } catch (err) {
              setBreweriesError(err.message)
            }
          }
        }
        getMyLocalBreweries()
      }, [clientLatLong])

      useEffect(() => {
        if (hasBreweries(breweriesNearMe)) {
            navigate('/breweries-near-me')
        }
      }, [breweriesNearMe])

    return (
        <div>
            <Asheville />
            <button onClick={onClick} >Find Breweries Near Me</button>
        </div>
    )
}

export default Home