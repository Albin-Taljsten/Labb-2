// import Heading from "./typescript/Heading"

import './scss/out/style.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Listings } from './pages/listings'
import { Contact } from './pages/contact'
import { About } from './pages/about'
import { ListingSearchProvider } from './hooks/listingSearchContext'

export function App() {
  return (
    <ListingSearchProvider>
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/listings" element={<Listings/>}/>
          <Route path = "/contact" element={<Contact/>}/>
          <Route path = "/about" element={<About/>}/>
        </Routes>
      </Router>
    </ListingSearchProvider>
  );
}
