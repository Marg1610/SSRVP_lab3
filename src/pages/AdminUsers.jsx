// src/pages/AdminUsers.jsx

import { useState, useEffect, useMemo } from 'react';
import AdminTable from '../components/AdminTable';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(setUsers);
    }, []);

    const toggleBlock = async (user) => {
        const updated = { ...user, isBlocked: !user.isBlocked };
        await fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isBlocked: updated.isBlocked })
        });
        setUsers(prev => prev.map(u => u.id === user.id ? updated : u));
    };

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });
        setUsers(prev => prev.filter(u => u.id !== id));
    };

const columns = useMemo(() => [
    { id: 'id', accessorKey: 'id', header: 'id', size: 150 },
    { id: 'name', accessorKey: 'name', header: 'имя', size: 150 },
    { id: 'username', accessorKey: 'username', header: 'логин', size: 150 },
    { id: 'role', accessorKey: 'role', header: 'роль', size: 100 },
    { 
        id: 'status', 
        accessorKey: 'isBlocked', 
        header: 'статус', 
        size: 150,
        cell: info => info.getValue() ? <span>заблокирован</span> : <span>активен</span> 
    },
    { 
        id: 'actions', 
        header: 'действия', 
        size: 200,
        cell: ({ row }) => {
            const userData = row.original;
            if (userData.role === 'admin') {
                return null;
            }

            return (
                <div className="d-flex gap-1">
                    <button 
                        className="btn btn-sm btn-warning rounded-pill px-2" 
                        onClick={() => toggleBlock(userData)}
                    >
                        {userData.isBlocked ? 'разблокировать' : 'заблокировать'}
                    </button>
                    <button 
                        className="btn btn-sm btn-danger rounded-pill px-2" 
                        onClick={() => deleteUser(userData.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            );
        }
    }
], [toggleBlock, deleteUser]);

    return (
        <div className="p-3">
            <h4 className="mb-4">управление пользователями</h4>
            <AdminTable data={users} columns={columns} />
        </div>
    );
};

export default AdminUsers;