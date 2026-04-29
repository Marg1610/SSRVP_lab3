// src/components/navigation.jsx
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand navbar-light p-0">
            <ul className="navbar-nav gap-3">
                <li className="nav-item">
                    <Link className="nav-link p-0" to="/">Главная</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link p-0" to="/about">О сайте</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;