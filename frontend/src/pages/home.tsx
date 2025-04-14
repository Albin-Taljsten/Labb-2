import { WelcomePage } from "../components/welcomePage"
import { NavBar } from "../components/navBar"
import { Footer } from "../components/footer"
import '../scss/home.css'

export function Home() {
    return (
        <>
            <NavBar activePage="home"></NavBar>
            <WelcomePage></WelcomePage>
            <Footer></Footer>
        </>
    );
}