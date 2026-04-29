import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Lab1 from '../pages/Lab1';
import Lab2 from '../pages/Lab2';
import Lab3 from '../pages/Lab3';
import Lab4 from '../pages/Lab4';
import Lab9 from '../pages/Lab9';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import Profile from '../pages/Profile';
import AdminUsers from '../pages/AdminUsers';
import AdminFeedback from '../pages/AdminFeedback';

const Content = () => {
    const user = useSelector(state => state.auth.user);
    const isAdmin = user?.role === 'admin';

    return (
        <section className="col-12">
            <Routes>
                <Route path="/" element={<div className="alert alert-info">выберите работу в меню выше</div>} />
                <Route path="/about" element={<About />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/users" element={isAdmin ? <AdminUsers /> : <Navigate to="/" replace />} />
                <Route path="/admin/feedback" element={isAdmin ? <AdminFeedback /> : <Navigate to="/" replace />} />
                <Route path="/lab/1" element={<Lab1 />} />
                <Route path="/lab/2" element={isAdmin ? <Lab2 /> : <Navigate to="/" replace />} />
                <Route path="/lab/3" element={<Lab3 />} />
                <Route path="/lab/4" element={<Lab4 />} />
                <Route path="/lab/9" element={<Lab9 />} />
                <Route path="/lab/:id" element={<div className="p-4">общее содержимое для лабораторной</div>} />
                <Route path="/admin/feedback" element={<AdminFeedback />} />
                <Route path="/admin/users" element={<AdminUsers />} />

            </Routes>
        </section>
    );
};

export default Content;