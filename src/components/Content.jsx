// src/components/content.jsx
import Container from './Container';

const Content = ({ selectedLab }) => {
    return (
        <section className="ms-md-4 flex-grow-1">
            <Container>
                {selectedLab ? (
                    <div className="card m-3">
                        <div className="card-body">
                            <h3 className="card-title h5">{selectedLab}</h3>
                            <p className="card-text text-secondary">
                                Содержимое.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-info m-3">
                        Пожалуйста, выберите лабораторную работу из списка.
                    </div>
                )}
            </Container>
        </section>
    );
};

export default Content;