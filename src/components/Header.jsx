import Container from './Container';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header className="py-3 border-bottom bg-white shadow-sm mb-4">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="h4 mb-0">
                        <a href="#" className="text-primary text-decoration-none">
                            ССРВП
                            </a>
                    </h1>
                    <Navigation />
                </div>
            </Container>
        </header>
    );
};

export default Header;