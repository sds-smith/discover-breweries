import { useContext, ReactNode} from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import { BreweryContext } from '../../context/brewery.context'
import { transformLabel } from '../../utils'
import { BreadcrumbLink } from './breadcrumbs.styles'

type linksArrayType = ReactNode[];

const BreadcrumbTrail = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const params = useParams();

  const {selectedBrewery} = useContext(BreweryContext);

  const renderLinks = () => {
    let accumulator = '';
    const links: linksArrayType = [
        <BreadcrumbLink key='home' /*underline="hover"*/ color="inherit" to='/'>
          Home
        </BreadcrumbLink>
    ];
    pathnames.forEach((pathname) => {
      accumulator = accumulator.concat(`/${pathname}`);
      if (pathnames.indexOf(pathname) === pathnames.length - 1) {
        const lastBreadcrumb = params.id !== undefined ? selectedBrewery.name : transformLabel(pathname)
        links.push(
          <Typography key={pathname} sx={{fontWeight: 'bold'}} color="inherit">
            {lastBreadcrumb}
          </Typography>
        );
      } else {
        links.push(
          <BreadcrumbLink key={pathname} /*underline="hover"*/ color="inherit" to={`${accumulator}`}>
            {transformLabel(pathname)}
          </BreadcrumbLink>
        );
      };
    });
    return links;
  };

  return (
    <Breadcrumbs sx={{margin: '10px 0px 0px 30px'}} aria-label="breadcrumb">
        {
          renderLinks()
        }
    </Breadcrumbs>
  );
};

export default BreadcrumbTrail;