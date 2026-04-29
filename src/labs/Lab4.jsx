import { useSelector, useDispatch } from 'react-redux';

const Lab4 = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <h5>Redux Counter</h5>
            <div className="input-group input-group-sm" style={{ width: '110px' }}>
                <button className="btn border" onClick={() => dispatch({ type: 'DECREMENT' })}>−</button>
                <span className="input-group-text fw-bold">{count}</span>
                <button className="btn border" onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
            </div>
        </div>
    );
};

export default Lab4;