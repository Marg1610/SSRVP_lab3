// src/pages/Login.jsx
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = useCallback((data) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ name: data.username }));
        dispatch({ type: 'LOGIN', payload: { name: data.username } });
    }, [dispatch]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow" style={{ width: '350px' }}>
                <h2 className="text-center mb-4">Вход</h2>
                <div className="mb-3">
                    <input 
                        {...register("username", { required: "Введите имя" })} 
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Логин"
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Войти</button>
            </form>
        </div>
    );
};

export default Login;