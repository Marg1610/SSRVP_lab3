// src/components/container.jsx
const Container = ({ children }) => {
  return (
    <div className="container-xxl"> 
      {children}
    </div>
  );
};

export default Container;