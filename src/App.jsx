// src/app.jsx
import { useState } from 'react';
import Layout from './components/Layout';
import Menu from './components/Menu';
import Content from './components/Content';

function App() {
    const [selectedLab, setSelectedLab] = useState('');

    return (
        <Layout>
            <Menu onSelectLab={setSelectedLab} />
            <Content selectedLab={selectedLab} />
        </Layout>
    );
}

export default App;