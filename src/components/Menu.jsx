// src/components/Menu.jsx
import { Link } from 'react-router-dom';

const Menu = () => {
    const labs = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <aside className="col-md-3">
            <h5 className="mb-3">Список работ</h5>
            <div className="list-group">
                {labs.map((num) => (
                    <Link 
                        key={num} 
                        to={`/lab/${num}`}
                        className="list-group-item list-group-item-action"
                    >
                        Лабораторная {num}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Menu;