import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const user = useSelector(state => state.auth?.user);
    const isAdmin = user?.role === 'admin';
    const labs = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <ul className="navbar-nav gap-lg-3">
            <li className="nav-item">
                <Link className="nav-link" to="/">главная</Link>
            </li>
            
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    лабораторные
                </a>
                <ul className="dropdown-menu shadow-sm">
                    {labs.map((num) => (
                        <li key={num}>
                            <Link className="dropdown-item" to={`/lab/${num}`}>лабораторная {num}</Link>
                        </li>
                    ))}
                </ul>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/about">о сайте</Link>
            </li>

            {isAdmin && (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-primary fw-bold" href="#" role="button" data-bs-toggle="dropdown">
                        админ панель
                    </a>
                    <ul className="dropdown-menu shadow-sm">
                        <li><Link className="dropdown-item" to="/admin/users">пользователи</Link></li>
                        <li><Link className="dropdown-item" to="/admin/feedback">управление отзывами</Link></li>
                    </ul>
                </li>
            )}
        </ul>
    );
};

export default Navigation;