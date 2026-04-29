// src/components/layout.jsx
import Header from './Header';
import Footer from './Footer';
import FloatingFeedback from './FloatingFeedback';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="container flex-grow-1 my-4">
                <div className="row">
                    {children}
                </div>
            </main>
            <Footer />
            <FloatingFeedback />
        </div>
    );
};

export default Layout;