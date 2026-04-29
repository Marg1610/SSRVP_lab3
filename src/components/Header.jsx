// src/components/Header.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import Container from './Container';
import Navigation from './Navigation';
import Button from './Button';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="py-3 border-bottom mb-4 bg-light-subtle">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          
          <div className="d-flex align-items-center gap-4">
            <h1 className="h4 mb-0">
                <Link to="/" className="text-primary text-decoration-none">
                    ССРВП
                </Link>
            </h1>
            <Navigation />
          </div>

          <Button onClick={toggleTheme}>
            {theme === 'light' ? (
              <i className="bi bi-brightness-high-fill"></i>
            ) : (
              <i className="bi bi-moon-stars-fill"></i>
            )}
          </Button>

        </div>
      </Container>
    </header>
  );
};

export default Header;