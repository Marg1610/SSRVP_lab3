// src/pages/Auth.jsx
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const onSubmit = useCallback((data) => {
        const displayName = isRegister ? data.fullName : data.username;
        const userData = { name: displayName };

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        
        dispatch({ type: 'LOGIN', payload: userData });
    }, [dispatch, isRegister]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">{isRegister ? 'Регистрация' : 'Вход'}</h2>
                {isRegister && (
                    <div className="mb-3">
                        <input 
                            {...register("fullName", { required: "Как вас зовут?" })} 
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            placeholder="Ваше Имя"
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                    </div>
                )}

                <div className="mb-3">
                    <input 
                        {...register("username", { 
                            required: "Введите логин",
                            minLength: { value: 3, message: "Минимум 3 символа" }
                        })} 
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Логин(для входа)"
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                </div>

                <div className="mb-3">
                    <input 
                        type="password"
                        {...register("password", { 
                            required: "Введите пароль",
                            minLength: { value: 6, message: "Минимум 6 символов" }
                        })} 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Пароль"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                {isRegister && (
                    <div className="mb-3">
                        <input 
                            type="password"
                            {...register("confirmPassword", { 
                                required: "Повторите пароль",
                                validate: value => value === password || "Пароли не совпадают"
                            })} 
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Повторите пароль"
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    {isRegister ? 'Создать аккаунт' : 'Войти'}
                </button>

                <div className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-link btn-sm" 
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;