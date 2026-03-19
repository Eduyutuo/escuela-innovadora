import React from 'react';
import StudentRoster from '../components/StudentRoster';

const EnrollmentPage = () => {
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Gestión de Matrículas</h1>
                    <p className="text-secondary mb-0">Control total de ingresos, traslados y estados de los estudiantes.</p>
                </div>
                <div className="text-end">
                    <div className="badge bg-primary-subtle text-primary p-2 rounded-pill px-3 mb-2">
                        Año Académico 2024
                    </div>
                </div>
            </header>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="modern-card card p-3 shadow-sm border-0 bg-primary text-white">
                        <h6 className="small fw-bold text-uppercase opacity-75 mb-3">Total Matriculados</h6>
                        <div className="d-flex justify-content-between align-items-end">
                            <h2 className="fw-bold mb-0">1,245</h2>
                            <span className="small">+5 en la última semana</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="modern-card card p-3 shadow-sm border-0">
                        <h6 className="small fw-bold text-uppercase text-muted mb-3">Pre-Matrículas</h6>
                        <div className="d-flex justify-content-between align-items-end">
                            <h2 className="fw-bold mb-0 text-info">56</h2>
                            <span className="small text-muted">Pendientes de confirmación</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="modern-card card p-3 shadow-sm border-0">
                        <h6 className="small fw-bold text-uppercase text-muted mb-3">Retirados/Trasladados</h6>
                        <div className="d-flex justify-content-between align-items-end">
                            <h2 className="fw-bold mb-0 text-danger">12</h2>
                            <span className="small text-muted">Periodo actual</span>
                        </div>
                    </div>
                </div>
            </div>

            <StudentRoster />
        </div>
    );
};

export default EnrollmentPage;
