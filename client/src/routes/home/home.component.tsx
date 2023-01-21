import { useEffect, useContext } from "react";

import CityGrid from "../../components/city-grid/city-grid.component";
import ActionBanner from "../../components/action-banner/action-banner.component";

import { ClientContext } from "../../context/client.context";

const Home = () => {
    const {setLocationErrorMsg} = useContext(ClientContext);

    useEffect(() => {
      setLocationErrorMsg('');
    }, [])

    return (
        <div>
          <CityGrid />
          <ActionBanner />
        </div>
    )
}

export default Home