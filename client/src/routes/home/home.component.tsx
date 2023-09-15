import { useEffect, useContext } from "react";

import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import Banner from "../../components/banner/banner.component";
import CityGrid from "../../components/city-grid/city-grid.component";
import ActionBox from "../../components/action-box/action-box.component";

import { ClientContext } from "../../context/client.context";
import { BreweryContext } from "../../context/brewery.context";
import useGetBreweries from "../../utils/hooks/use-get-breweries";

const Home = () => {
    const {setLocationErrorMsg} = useContext(ClientContext);
    const {loading, hasBreweries, defaultBreweries} = useContext(BreweryContext)

    const {getDefaultBreweries} = useGetBreweries();

    useEffect(() => {
      setLocationErrorMsg('');
    }, [])

    useEffect(() => {
      if (!hasBreweries(defaultBreweries) && !loading) {
          getDefaultBreweries();
      };
  }, []);

    return (
        <div>
          <Banner />
          {
            !loading ?
            <>
              <CityGrid />
              <ActionBox />
            </>
            :
            <>
              <Skeleton variant="rectangular" animation='wave' width={'80%'} height={30}  sx={{margin: '50px auto'}}/>
              <Skeleton variant="rectangular" animation='wave' width={'80%'} height={30}  sx={{margin: '50px auto'}}/></>
          }

        </div>
    )
}

export default Home