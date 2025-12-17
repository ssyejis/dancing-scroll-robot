import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    return (
        <header>
        <nav>
            <ul>
                <li className={location.pathname === '/' ? 'isActive' : ''}><Link to="/">Dancing Robot</Link></li>
                <li className={location.pathname === '/scroll' ? 'isActive' : ''}><Link to="/scroll">Scroll Banner</Link></li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;