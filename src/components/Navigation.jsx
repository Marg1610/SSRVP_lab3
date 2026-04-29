// src/components/navigation.jsx
import { Link } from 'react-router-dom';

const Navigation = () => {
    const labs = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <ul className="navbar-nav gap-lg-3">
            <li className="nav-item">
                <Link className="nav-link" to="/">Главная</Link>
            </li>
            
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Лабораторные
                </a>
                <ul className="dropdown-menu shadow-sm">
                    {labs.map((num) => (
                        <li key={num}>
                            <Link className="dropdown-item" to={`/lab/${num}`}>
                                Лабораторная {num}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/about">О сайте</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/feedback">Обратная связь</Link>
            </li>
        </ul>
    );
};

export default Navigation;