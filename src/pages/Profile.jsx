// src/pages/Profile.jsx
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    
    const { register, handleSubmit, formState: { errors } } = useForm({ 
        defaultValues: user 
    });

    const onSave = async (data) => {
        const res = await fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            const updatedUser = { ...user, ...data };
            dispatch({ type: 'UPDATE_USER', payload: updatedUser });
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsEditing(false);
        }
    };

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
                console.error('Ошибка при удалении:', error);
            }
        }
    }, [user.id, dispatch]);

    if (!user) return <div className="text-center mt-5">Загрузка...</div>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
                <div className="card-body p-4">
                    {!isEditing ? (
                        <div className="text-center">
                            <div className="mb-3">
                                <i className="bi bi-person-circle display-1 text-primary"></i>
                            </div>
                            <h2 className="fw-bold mb-1">{user.name}</h2>
                            <p className="text-muted small mb-4">ID: {user.id}</p>
                            
                            <div className="text-start mb-4">
                                <h6 className="text-primary fw-bold border-bottom pb-2">
                                    <i className="bi bi-info-circle me-2"></i>О себе
                                </h6>
                                <div className="p-3 bg-light-sm rounded border shadow-inner">
                                    {user.about || <span className="text-muted italic">Информация не заполнена</span>}
                                </div>
                            </div>

                            <button onClick={() => setIsEditing(true)} className="btn btn-outline-primary px-4 rounded-pill">
                                <i className="bi bi-pencil-square me-2"></i>Редактировать профиль
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSave)}>
                            <h4 className="mb-4 fw-bold text-center">Редактирование профиля</h4>
                            
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Имя</label>
                                <input 
                                    {...register("name", { required: true })} 
                                    className="form-control form-control-lg" 
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">О себе</label>
                                <textarea 
                                    {...register("about")} 
                                    className="form-control" 
                                    rows="4" 
                                    placeholder="Расскажите о себе..."
                                />
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg rounded-pill">
                                    Сохранить изменения
                                </button>
                                
                                <div className="d-flex gap-2 mt-2 ">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsEditing(false)} 
                                        className="btn bg-body-secondary border flex-grow-1 rounded-pill"
                                    >
                                        Отмена
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={handleDeleteAccount} 
                                        className="btn btn-outline-danger px-4 rounded-pill">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;