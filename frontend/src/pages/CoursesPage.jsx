import React from 'react';
import CourseList from '../components/CourseList';

const CoursesPage = () => {
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Cursos y Planificación</h1>
                    <p className="text-secondary mb-0">Gestión de sílabos, horarios y asignación de docentes por sección.</p>
                </div>
                <div className="text-end">
                    <div className="badge bg-info-subtle text-info p-2 rounded-pill px-3 mb-2">
                        Ciclo Académico 2024-I
                    </div>
                </div>
            </header>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="modern-card card p-4 shadow-sm border-0 border-top border-primary border-4">
                        <h6 className="small fw-bold text-muted mb-3">Nivel Primaria</h6>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="fw-bold mb-0">12</h2>
                            <span className="badge bg-primary-subtle text-primary rounded-pill">Secciones</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="modern-card card p-4 shadow-sm border-0 border-top border-success border-4">
                        <h6 className="small fw-bold text-muted mb-3">Nivel Secundaria</h6>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="fw-bold mb-0">15</h2>
                            <span className="badge bg-success-subtle text-success rounded-pill">Secciones</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="modern-card card p-4 shadow-sm border-0 border-top border-warning border-4">
                        <h6 className="small fw-bold text-muted mb-3">Talleres Libres</h6>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="fw-bold mb-0">8</h2>
                            <span className="badge bg-warning-subtle text-warning rounded-pill">Activos</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <CourseList />
                </div>
                <div className="col-lg-4">
                    <div className="modern-card card p-4 shadow-sm border-0 bg-light">
                        <h5 className="fw-bold mb-4">Próximos Cierres</h5>
                        <div className="list-group list-group-flush bg-transparent">
                            {[
                                { date: '25 Mar', title: 'Entrega de Sílabo Q2', status: 'Sugerido' },
                                { date: '30 Mar', title: 'Cierre de Registro Q1', status: 'Crítico' },
                            ].map((item, idx) => (
                                <div className="list-group-item bg-transparent border-0 px-0 mb-3" key={idx}>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-white p-2 rounded-3 shadow-sm text-center me-3" style={{ minWidth: '60px' }}>
                                            <span className="fw-bold small">{item.date}</span>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-0 small">{item.title}</h6>
                                            <span className={`small text-${item.status === 'Crítico' ? 'danger' : 'primary'}`}>{item.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-outline-primary btn-sm w-100 rounded-pill mt-4">Ver Calendario Completo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
