import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

const FloatingFeedback = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const isAdmin = user?.role === 'admin';
    const onSubmit = useCallback(async (data) => {
        const newReview = { 
            author: user.name, 
            authorId: user.id, 
            text: data.text, 
            date: new Date().toLocaleString() 
        };

        try {
            const res = await fetch('http://localhost:3001/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });
            
            const created = await res.json();
            dispatch({ type: 'ADD_FEEDBACK', payload: created });
            reset();
            setIsOpen(false);
        } catch (error) {
            console.error("ошибка при отправке отзыва:", error);
        }
    }, [user, dispatch, reset]);

    return (
        <div className="position-fixed d-flex flex-column align-items-end" style={{ bottom: '50px',right: '25px', zIndex: 1050 }}>
            {isOpen && (
                <div className="card shadow-lg mb-3" style={{ width: '300px' }}>
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <span>Оставить отзыв</span>
                        <button type="button" className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-2">
                                <textarea 
                                    {...register("text", { required: "введите текст сообщения" })} 
                                    className={`form-control form-control-sm ${errors.text ? 'is-invalid' : ''}`} 
                                    placeholder="ваш отзыв..." 
                                    rows="3" 
                                />
                                {errors.text && <div className="invalid-feedback small">{errors.text.message}</div>}
                            </div>
                            <button className="btn btn-primary btn-sm w-100 rounded-pill">
                                отправить
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`btn ${isOpen ? 'btn-secondary' : 'btn-primary'} rounded-circle shadow-lg d-flex align-items-center justify-content-center`}
                style={{ width: '50px', height: '50px' }}
            >
                {isOpen ? <i className="bi bi-x-lg fs-4"></i> : <i className="bi bi-chat-dots-fill fs-4"></i>}
            </button>
        </div>
    );
};

export default FloatingFeedback;