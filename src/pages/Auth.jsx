// src/pages/Auth.jsx
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [serverError, setServerError] = useState('');
    const dispatch = useDispatch();
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const loginUser = (userData) => {
        const safeUser = { 
            id: userData.id, 
            name: userData.name, 
            username: userData.username,
            role: userData.role || 'user'
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(safeUser));
        dispatch({ type: 'LOGIN', payload: safeUser });
    };

    const onSubmit = useCallback(async (data) => {
        setServerError('');
        try {
            if (isRegister) {
                const userData = { 
                    name: data.fullName, 
                    username: data.username, 
                    password: data.password,
                    role: 'user',
                    isBlocked: false
                };
                const res = await fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                const newUser = await res.json();
                loginUser(newUser);
            } else {
                const res = await fetch(`http://localhost:3001/users?username=${data.username}`);
                const users = await res.json();
                
                if (users.length > 0 && users[0].password === data.password) {
                    if (users[0].isBlocked) {
                        setServerError('ваш аккаунт заблокирован');
                    } else {
                        loginUser(users[0]);
                    }
                } else {
                    setServerError('неверный логин или пароль');
                }
            }
        } catch (error) {
            setServerError('ошибка соединения с сервером');
        }
    }, [isRegister, dispatch]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">{isRegister ? 'регистрация' : 'вход'}</h2>
                
                {serverError && <div className="alert alert-danger py-2">{serverError}</div>}

                {isRegister && (
                    <div className="mb-3">
                        <input 
                            {...register("fullName", { required: "введите имя" })} 
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            placeholder="ваше имя (отображается в профиле)"
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                    </div>
                )}

                <div className="mb-3">
                    <input 
                        {...register("username", { required: "введите логин" })} 
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="логин"
                    />
                </div>

                <div className="mb-3">
                    <input 
                        type="password"
                        {...register("password", { required: "введите пароль" })} 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="пароль"
                    />
                </div>

                {isRegister && (
                    <div className="mb-3">
                        <input 
                            type="password"
                            {...register("confirmPassword", { 
                                validate: value => value === password || "пароли не совпадают"
                            })} 
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="повторите пароль"
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    {isRegister ? 'создать аккаунт' : 'войти'}
                </button>

                <div className="text-center">
                    <button type="button" className="btn btn-link btn-sm" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'уже есть аккаунт? войти' : 'нет аккаунта? регистрация'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;