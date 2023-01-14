
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header.component";
import BreadcrumbTrail from "../../components/breadcrumbs/breadcrumbs.component";

import './navigation.styles.scss';

const Navigation = () => {
    return (
        <div className='navigationContainer'>
            <Header />
            <BreadcrumbTrail />
            <Outlet />
        </div>
    )
};

export default Navigation;