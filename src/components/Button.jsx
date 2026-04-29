// src/components/button.jsx
const Button = ({ children, onClick, text }) => {
    return (
        <button className="btn  rounded-circle border" onClick={onClick}>
            {children || text}
        </button>
    );
};

export default Button;