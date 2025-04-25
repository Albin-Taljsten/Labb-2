import { Link } from "react-router-dom"

export function NavBar({ activePage }: { activePage: string })
{
    switch (activePage)
    {
        case "home":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" id="active" to="/">Home</Link>
                        <Link className="link" to="/listings">Listings</Link>
                    </div>
                </>
            );
        case "listings":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" to="/">Home</Link>
                        <Link className="link" id="active" to="/listings">Listings</Link>
                    </div>
                </>
            );
    }
}