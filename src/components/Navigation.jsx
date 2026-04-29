// src/components/navigation.jsx
const Navigation = () => {
    return (
        <nav className="navbar navbar-expand navbar-light">
            <ul className="navbar-nav gap-3">
                <li className="nav-item">
                    <a className="nav-link p-0" href="#">Главная</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link p-0" href="#">О сайте</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;