// src/pages/AdminFeefback.jsx

import { useState, useEffect, useMemo } from 'react';
import AdminTable from '../components/AdminTable';

const AdminFeedback = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/feedback')
            .then(res => res.json())
            .then(data => setFeedback(data.reverse()));
    }, []);

    const deleteFeedback = async (id) => {
        await fetch(`http://localhost:3001/feedback/${id}`, { method: 'DELETE' });
        setFeedback(prev => prev.filter(f => f.id !== id));
    };

    const columns = useMemo(() => [
        { id: 'id', accessorKey: 'id', header: 'id', size: 150 },
        { id: 'author', accessorKey: 'author', header: 'автор', size: 150 },
        { id: 'date', accessorKey: 'date', header: 'дата', size: 200 },
        { id: 'text', accessorKey: 'text', header: 'текст', size: 300 },
        { 
            id: 'actions', 
            header: 'действия', 
            size: 100,
            cell: ({ row }) => (
                <button className="btn btn-sm btn-danger rounded-pill px-2" onClick={() => deleteFeedback(row.original.id)}>
                    <i className="bi bi-trash"></i> удалить
                </button>
            )
        }
    ], []);

    return (
        <div className="p-3">
            <h4 className="mb-4">управление отзывами</h4>
            <AdminTable data={feedback} columns={columns} />
        </div>
    );
};

export default AdminFeedback;