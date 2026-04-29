// src/components/Content.jsx
import { Routes, Route, useParams } from 'react-router-dom';
import Lab1 from '../labs/Lab1';
import Lab2 from '../labs/Lab2.jsx';
import Lab3 from '../labs/Lab3';
import Lab4 from '../labs/Lab4';

const LabDetails = () => {
    const { id } = useParams();

    const labComponents = {
        '1': <Lab1 />,
        '2': <Lab2 />,
        '3': <Lab3 />,
        '4': <Lab4 />,
    };

    return (
        <div className="card shadow-sm p-4">
            <h3>Содержимое лабораторной {id}</h3>
            <hr />
            {labComponents[id] || <p>Общее содержимое для лабораторной {id}</p>}
        </div>
    );
};

const Content = () => {
    return (
        <section className="col-md-9">
            <Routes>
                <Route path="/" element={<div className="alert alert-info">Выберите работу слева</div>} />
                <Route path="/lab/:id" element={<LabDetails />} />
            </Routes>
        </section>
    );
};

export default Content;