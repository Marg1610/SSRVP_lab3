// src/pages/Lab9.jsx
import { useGetPostsQuery } from '../store/apiSlice';

const Lab9 = () => {
    const { data: posts, isError, isLoading, isFetching, refetch } = useGetPostsQuery();

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Список постов (RTK Query)</h4>
                <button className="btn btn-sm btn-outline-primary" onClick={refetch}>
                    обновить данные
                </button>
            </div>

            {isLoading && (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">загрузка...</span>
                    </div>
                </div>
            )}

            {isFetching && !isLoading && (
                <div className="text-muted small mb-2 fw-bold text-primary">
                    <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                    фоновое обновление...
                </div>
            )}

            {isError && (
                <div className="alert alert-danger shadow-sm border-0" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    произошла ошибка при загрузке данных с сервера.
                </div>
            )}

            {!isLoading && !isError && posts && (
                <div className="list-group shadow-sm">
                    {posts.map(post => (
                        <div key={post.id} className="list-group-item p-3 border-start border-4 border-primary">
                            <h6 className="fw-bold">{post.title}</h6>
                            <p className="mb-0 text-secondary">{post.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Lab9;