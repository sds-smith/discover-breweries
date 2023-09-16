import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/header/header.component";
import BreadcrumbTrail from "../../components/breadcrumbs/breadcrumbs.component";
import { NavigationContainer } from "./navigation.styles";

const Navigation = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <NavigationContainer imageToDisplay={pathnames.length}>
            <Header />
            <BreadcrumbTrail />
            <Outlet />
        </NavigationContainer>
    )
};

export default Navigation;