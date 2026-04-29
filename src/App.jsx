// src/App.jsx
import { useLoginState } from './hooks/useLoginState';
import Layout from './components/Layout';
import Menu from './components/Menu';
import Content from './components/Content';
import Auth from './pages/Auth';

function App() {
    const { isLoggedIn } = useLoginState();
    if (!isLoggedIn) {
        return <Auth />;
    }
    return (
        <Layout>
            <div className="row mt-4">
                <Menu />
                <Content />
            </div>
        </Layout>
    );
}

export default App;