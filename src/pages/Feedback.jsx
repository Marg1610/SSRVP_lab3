import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

const Feedback = () => {
  const feedbackList = useSelector(state => state.feedback);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetch('http://localhost:3001/feedback')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_FEEDBACK', payload: data.reverse() }));
  }, [dispatch]);

  const addReview = useCallback(async (data) => {
    const newReview = { 
      author: user.name, 
      authorId: user.id, 
      text: data.text, 
      date: new Date().toLocaleString() 
    };

    const res = await fetch('http://localhost:3001/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });
    
    const created = await res.json();
    dispatch({ type: 'ADD_FEEDBACK', payload: created });
    reset();
  }, [user, dispatch, reset]);

  const deleteReview = useCallback(async (id) => {
    await fetch(`http://localhost:3001/feedback/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE_FEEDBACK', payload: id });
  }, [dispatch]);

  return (
    <div className="p-3">
      <div className="card shadow-sm p-4 mb-4">
        <h4>Оставить отзыв</h4>
        <form onSubmit={handleSubmit(addReview)}>
          <div className="mb-3">
            <input 
              value={user.name} 
              className="form-control" 
              disabled 
              readOnly 
            />
          </div>
          <div className="mb-3">
            <textarea 
              {...register("text", { required: "введите текст сообщения" })} 
              className={`form-control ${errors.text ? 'is-invalid' : ''}`} 
              placeholder="Ваш отзыв..." 
              rows="3" 
            />
            {errors.text && <div className="invalid-feedback">{errors.text.message}</div>}
          </div>
          <button className="btn btn-primary rounded-pill w-100">Отправить</button>
        </form>
      </div>
      <h5>Все отзывы</h5>
      <div className="list-group">
        {feedbackList.length > 0 ? (
          feedbackList.map(r => (
          <div key={r.id} className="list-group-item shadow-sm mb-2 border-start border">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-primary">{r.author}</h6>
              <small className="text-muted">{r.date}</small>
              <div className="d-flex align-items-center gap-2">
                {String(r.authorId) === String(user.id) && (
                  <button onClick={() => deleteReview(r.id)} className="btn btn-sm">
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2 mb-1 text-secondary">{r.text}</p>
          </div>
          ))) : (
          <div className="alert alert-primary shadow-sm border-0 text-center py-4" role="alert">
            Здесь пока ничего нет
          </div>
        )}
        </div>
      </div>
  );
};

export default Feedback;
