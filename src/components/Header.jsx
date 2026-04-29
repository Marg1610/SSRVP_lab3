// src/components/Header.jsx
import { useSelector, useDispatch } from 'react-redux'; 
import { useCallback, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import Container from './Container';
import Navigation from './Navigation';
import Button from './Button';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.user);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    }, [dispatch]);

    return (
        <header className="py-3 border-bottom shadow-sm mb-4 bg-body text-body">
            <Container>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-4">
                        <Link to="/" className="h4 mb-0 text-decoration-none text-primary fw-bold">ССРВП</Link>
                        <Navigation />
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {user && (
                            <div className="dropdown border-end pe-3">
                                <button 
                                    className="btn btn-sm btn-link text-decoration-none dropdown-toggle d-flex align-items-center gap-2 p-0 text-body" 
                                    type="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle fs-5 text-primary"></i>
                                    <span className="fw-semibold">{user.name}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                                            <i className="bi bi-person"></i> Профиль
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2">
                                            <i className="bi bi-box-arrow-right"></i> Выйти
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        
                        <Button onClick={toggleTheme}>
                            {theme === 'light' ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>}
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;