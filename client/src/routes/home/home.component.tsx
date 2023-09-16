import { useEffect, useContext } from "react";
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Banner from "../../components/banner/banner.component";
import CityGrid from "../../components/city-grid/city-grid.component";
import ActionBox from "../../components/action-box/action-box.component";
import { BreweryContext } from "../../context/brewery.context";
import useGetBreweries from "../../utils/hooks/use-get-breweries";

const Home = () => {
    const {loading, hasBreweries, defaultBreweries} = useContext(BreweryContext)

    const {getDefaultBreweries} = useGetBreweries();

    useEffect(() => {
      if (!hasBreweries(defaultBreweries) && !loading) {
          getDefaultBreweries();
      };
  }, []);

    return (
        <Grid container>
          <Banner />
          {
            !loading ?
            <>
              <CityGrid />
              <ActionBox />
            </>
            :
            <>
              <Skeleton variant="rectangular" animation='wave' width={'80%'} height={'18vh'}  sx={{margin: '50px auto'}}/>
              <Skeleton variant="rectangular" animation='wave' width={'80%'} height={'24.2vh'}  sx={{margin: '50px auto'}}/></>
          }
        </Grid>
    )
}

export default Home