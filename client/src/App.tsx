import {Routes, Route} from "react-router-dom";
import Navigation from './routes/navigation/navigation.component'
import Home from "./routes/home/home.component";
import BreweryPage from "./routes/brewery-page/brewery-page.component";
import BreweriesNearMe from "./routes/breweries-near-me/breweries-near-me.component";
import SearchResults from "./routes/search-results/search-results.component";
import DefaultCity from "./components/default-city/default-city.component";


const App = () => {

    return (
        <>
        <Routes>
            <Route path='/' element={<Navigation />} >
                <Route index element={<Home />} />
                <Route path='asheville' element={<DefaultCity />} />
                <Route path='breweries-near-me' element={<BreweriesNearMe />} />
                <Route path=':city/:id' element={<BreweryPage />} />
                <Route path=':city' element={<SearchResults />} />

            </Route>
        </Routes>
        </>

    )
}

export default App