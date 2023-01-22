import { useEffect, useContext } from "react";

import Banner from "../../components/banner/banner.component";
import CityGrid from "../../components/city-grid/city-grid.component";
import ActionBox from "../../components/action-box/action-box.component";

import { ClientContext } from "../../context/client.context";

const Home = () => {
    const {setLocationErrorMsg} = useContext(ClientContext);

    useEffect(() => {
      setLocationErrorMsg('');
    }, [])

    return (
        <div>
          <Banner />
          <CityGrid />
          <ActionBox />
        </div>
    )
}

export default Home