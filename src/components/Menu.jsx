// src/components/menu.jsx

const Menu = ({ onSelectLab }) => {
    const labs = Array.from({ length: 9 }, (_, i) => `Лабораторная работа ${i + 1}`);

    return (
        <aside>
            <label className="form-label fw-bold">Меню</label>
            <select 
                id="lab-select"
                className="form-select"
                onChange={(e) => onSelectLab(e.target.value)}
            >
                <option value="">Выберите лабу</option>
                {labs.map((lab) => (
                    <option key={lab} value={lab}>{lab}</option>
                ))}
            </select>
        </aside>
    );
};

export default Menu;