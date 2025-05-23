import { Link } from "react-router-dom"

export function NavBar({ activePage, loggedIn, toggleLogin }: { activePage: string; loggedIn?: boolean; toggleLogin?: () => void; })
{
    switch (activePage)
    {
        case "home":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" id="active" to="/">Home</Link>
                        <Link className="link" to="/listings">Listings</Link>
                        <Link className="link" to="/market">Analyse Market</Link>
                    </div>
                </>
            );
        case "listings":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" to="/">Home</Link>
                        <Link className="link" id="active" to="/listings">Listings</Link>
                        <Link className="link" to="/market">Analyse Market</Link>
                    </div>
                </>
            );
        case "market":
            return(
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" to="/">Home</Link>
                        <Link className="link" to="/listings">Listings</Link>
                        <Link className="link" id="active" to="/market">Analyse Market</Link>
                        <Link className="navBarRight link" onClick={toggleLogin} to="/market">{loggedIn ? "Login" : "Logout"}</Link>
                    </div>
                </>
            )
    }
}