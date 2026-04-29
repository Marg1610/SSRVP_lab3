// src/pages/Feedback.jsx
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Feedback = () => {
    const [reviews, setReviews] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const addReview = useCallback((data) => {
        const newReview = {
            id: Date.now(),
            name: data.author,
            text: data.text
        };
        setReviews(prev => [newReview, ...prev]);
        reset();
    }, [reset]);

    return (
        <div className="p-3">
            <div className="card shadow-sm p-4 mb-4">
                <h4>Оставить отзыв</h4>
                <form onSubmit={handleSubmit(addReview)}>
                    <div className="mb-3">
                        <input 
                            {...register("author", { required: "Ваше имя" })} 
                            className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                            placeholder="Ваше имя"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea 
                            {...register("text", { required: "Напишите что-нибудь" })} 
                            className={`form-control ${errors.text ? 'is-invalid' : ''}`}
                            placeholder="Ваш отзыв..."
                            rows="3"
                        />
                    </div>
                    <button className="btn btn-success">Опубликовать</button>
                </form>
            </div>

            <h5>Все отзывы</h5>
            <div className="list-group">
                {reviews.map(r => (
                    <div key={r.id} className="list-group-item shadow-sm mb-2 border-start border">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-1 fw-bold">{r.name}</h6>
                            <small className="text-muted">ID: {r.id.toString().slice(-4)}</small>
                        </div>
                        <p className="mb-1">{r.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;