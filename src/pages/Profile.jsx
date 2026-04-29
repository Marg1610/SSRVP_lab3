// src/pages/Profile.jsx
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { fullName: user?.name }
    });

    const onSubmit = useCallback(async (data) => {
        try {
            const res = await fetch(`http://localhost:3001/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: data.fullName })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                const newSafeUser = { ...user, name: updatedUser.name };
                localStorage.setItem('user', JSON.stringify(newSafeUser));
                dispatch({ type: 'UPDATE_USER', payload: newSafeUser });
                setMessage('Профиль успешно обновлен!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            setMessage('Ошибка при сохранении');
        }
    }, [user, dispatch]);

    const handleDeleteAccount = useCallback(async () => {
        if (window.confirm('Вы уверены?')) {
            try {
                const feedbackRes = await fetch(`http://localhost:3001/feedback?authorId=${user.id}`);
                const userFeedbacks = await feedbackRes.json();

                await Promise.all(userFeedbacks.map(f => 
                    fetch(`http://localhost:3001/feedback/${f.id}`, { method: 'DELETE' })
                ));

                const res = await fetch(`http://localhost:3001/users/${user.id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                }
            } catch (error) {
                setMessage('Ошибка при удалении');
            }
        }
    }, [user.id, dispatch]);

    if (!user) return <div>Загрузка...</div>;

    return (
        <div className="card shadow-sm p-4 col-md-6 mx-auto mt-4">
            <h3 className="mb-4"><i className="bi bi-person-gear me-2"></i>Настройки профиля</h3>
            {message && <div className={`alert ${message.includes('Ошибка') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 text-center">
                    <div className="display-4 text-primary"><i className="bi bi-person-circle"></i></div>
                    <p className="text-muted small">ID: {user.id}</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Логин</label>
                    <input className="form-control bg-light-sm" value={user.username} disabled />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Имя на сайте</label>
                    <input 
                        {...register("fullName", { required: "Введите имя" })} 
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    />
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Обновить имя</button>
                    <button type="button" onClick={handleDeleteAccount} className="btn btn-outline-danger">
                        <i className="bi bi-trash3 me-2"></i>Удалить аккаунт
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;