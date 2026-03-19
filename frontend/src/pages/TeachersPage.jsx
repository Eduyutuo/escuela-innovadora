import React from 'react';
import TeacherRoster from '../components/TeacherRoster';

const TeachersPage = () => {
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Gestión de Docentes</h1>
                    <p className="text-secondary mb-0">Administración del personal académico, sus especialidades y estados actuales.</p>
                </div>
                <div className="text-end">
                    <div className="badge bg-info-subtle text-info p-2 rounded-pill px-3 mb-2">
                        Plantel 2024
                    </div>
                </div>
            </header>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-info-subtle text-info mb-3">
                            <i className="bi bi-mortarboard fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">Docentes Activos</p>
                        <h3 className="fw-bold mb-0">86</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-success-subtle text-success mb-3">
                            <i className="bi bi-clock fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">Carga Horaria Promedio</p>
                        <h3 className="fw-bold mb-0">24h/semana</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-warning-subtle text-warning mb-3">
                            <i className="bi bi-calendar-range fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">En Licencia</p>
                        <h3 className="fw-bold mb-0">4</h3>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <TeacherRoster />
                </div>
            </div>
        </div>
    );
};

export default TeachersPage;
