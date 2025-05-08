// import Heading from "./typescript/Heading"

import './scss/out/style.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Listings } from './pages/listings'
import { ListingSearchProvider } from './hooks/listingSearchContext'
import { Market } from './pages/market'

export function App() {
  return (
    <ListingSearchProvider>
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/listings" element={<Listings/>}/>
          <Route path = "/market" element={<Market/>}/>
        </Routes>
      </Router>
    </ListingSearchProvider>
  );
}
