// src/components/Content.jsx
import { Routes, Route, useParams } from 'react-router-dom';
import Lab1 from '../pages/Lab1';
import Lab2 from '../pages/Lab2.jsx';
import Lab3 from '../pages/Lab3';
import Lab4 from '../pages/Lab4';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import Profile from '../pages/Profile';
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
    <section className="col-12">
        <Routes>
            <Route path="/" element={<div className="alert alert-info">Выберите работу в меню выше</div>} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lab/:id" element={<LabDetails />} />
        </Routes>
        </section>
    );
};

export default Content;