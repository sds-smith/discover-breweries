import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../../context/client.context";

const Home = () => {
    const navigate = useNavigate()
    const {setLocationErrorMsg} = useContext(ClientContext);

    useEffect(() => {
      setLocationErrorMsg('');
      navigate('/asheville')
    }, [])

    return (
        <div>
          Loading...
        </div>
    )
}

export default Home