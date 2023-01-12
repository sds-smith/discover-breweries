
import { Outlet } from "react-router-dom";
import ButtonAppBar from "../../components/header/button-app-bar.component";
import BreadcrumbTrail from "../../components/breadcrumbs/breadcrumbs.component";

import './navigation.styles.scss'

const Navigation = () => {

    return (
        <div className='navigationContainer'>
            <ButtonAppBar />
            <BreadcrumbTrail />
            <Outlet />
        </div>
    )
}

export default Navigation