import { useContext, ReactNode} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { BreweryContext } from '../../context/brewery.context'
import { transformLabel } from '../../utils'

type linksArrayType = ReactNode[];

const BreadcrumbTrail = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const params = useParams();

  const {selectedBrewery} = useContext(BreweryContext);

  const renderLinks = () => {
    let accumulator = '';
    const links: linksArrayType = [
        <Link key='home' underline="hover" color="inherit" href='/'>
          Home
        </Link>
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
          <Link key={pathname} underline="hover" color="inherit" href={`${accumulator}`}>
            {transformLabel(pathname)}
          </Link>
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