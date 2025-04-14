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
                        <Link className="link" to="/contact">Contact</Link>
                        <Link className="navBarRight link" to="/about">About</Link>
                    </div>
                </>
            );
        case "listings":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" to="/">Home</Link>
                        <Link className="link" id="active" to="/listings">Listings</Link>
                        <Link className="link" to="/contact">Contact</Link>
                        <Link className="navBarRight link" to="/about">About</Link>
                    </div>
                </>
            );
        case "contact":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" to="/">Home</Link>
                        <Link className="link" to="/listings">Listings</Link>
                        <Link className="link" id="active" to="/contact">Contact</Link>
                        <Link className="navBarRight link" to="/about">About</Link>
                    </div>
                </>
            );
        case "about":
            return (
                <>
                    <div id="navBar">
                        <Link className="navBarLeft link" to="/">Home</Link>
                        <Link className="link" to="/listings">Listings</Link>
                        <Link className="link" to="/contact">Contact</Link>
                        <Link className="navBarRight link" id="active" to="/about">About</Link>
                    </div>
                </>
            );
    }
}