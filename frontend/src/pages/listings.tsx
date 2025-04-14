import { Footer } from "../components/footer"
import { ListingList } from "../components/listingList"
import { ListingSearch } from "../components/listingSearch"
import { NavBar } from "../components/navBar"
import '../scss/listingSearch.css'
import '../scss/listings.css'

export function Listings()
{
    return (
        <>
            <NavBar activePage="listings"></NavBar>
            <div id="listingBody">
                <ListingList></ListingList>
                <ListingSearch></ListingSearch>
            </div>
            <Footer></Footer>
        </>
    );
}