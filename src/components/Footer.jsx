// src/components/footer.jsx
import Container from './Container';

const Footer = () => {
  return (
    <footer className="py-4 mt-auto border-top bg-light-subtle">
      <Container>
        <div className="d-flex flex-column align-items-center">
          <p className="text-muted">&copy; 2025 Лабораторные работы ССРВП</p>
          <a 
            href="https://github.com/Marg1610/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-secondary opacity-75 github-link transition-all"
            style={{ fontSize: '1.5rem' }}
          >
            <i className="bi bi-github"></i>
        
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
