// src/components/footer.jsx
import Container from './Container';

const Footer = () => {
    return (
        <footer className="py-4 mt-auto border-top bg-light text-center">
            <Container>
                <p className="text-muted">&copy; 2025 Лабораторные работы ССРВП</p>
            </Container>
        </footer>
    );
};

export default Footer;