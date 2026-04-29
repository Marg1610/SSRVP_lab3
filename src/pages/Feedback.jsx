import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Feedback = () => {
  const feedbackList = useSelector(state => state.feedback);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/feedback')
      .then(res => res.json())
      .then(data => {
        const myFeedback = data.filter(r => String(r.authorId) === String(user?.id));
        dispatch({ type: 'SET_FEEDBACK', payload: myFeedback.reverse() });
      });
  }, [dispatch, user?.id]);

  const deleteReview = useCallback(async (id) => {
    if (!window.confirm('Удалить этот отзыв?')) return;
    try {
      const res = await fetch(`http://localhost:3001/feedback/${id}`, { method: 'DELETE' });
      if (res.ok) {
        dispatch({ type: 'DELETE_FEEDBACK', payload: id });
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  }, [dispatch]);

  return (
    <div className="p-3">
      <h5>Все ваши отзывы</h5>
      
      <div className="list-group mt-3">
        {feedbackList.length > 0 ? (
          feedbackList.map(r => (
            <div key={r.id} className="list-group-item shadow-sm mb-2 border-start border">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold text-primary">{r.author}</h6>
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted">{r.date}</small>
                  <button onClick={() => deleteReview(r.id)} className="btn btn-sm btn-outline-danger border-0" title="удалить отзыв">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
              <p className="mt-2 mb-1 text-secondary">{r.text}</p>
            </div>
          ))
        ) : (
          <div className="alert alert-primary shadow-sm border-0 text-center py-4" role="alert">
            Здесь пока ничего нет
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
