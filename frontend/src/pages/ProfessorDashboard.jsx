import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseList from '../components/CourseList';
import NotificationModal from '../components/NotificationModal';

const ProfessorDashboard = () => {
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info' });
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Panel Docente</h1>
                    <p className="text-secondary mb-0">Control de asistencia, evaluación y seguimiento de silabo.</p>
                </div>
                <div className="text-end d-none d-md-block">
                    <div className="badge bg-success-subtle text-success p-2 rounded-pill px-3 mb-2">
                        Período Académico 2024-I
                    </div>
                </div>
            </header>

            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Mis Cursos</h5>
                        <Link to="/cursos" className="btn btn-sm btn-outline-primary rounded-pill px-3">Ver Todo</Link>
                    </div>
                    <CourseList />
                </div>
                
                <div className="col-lg-8">
                    <div className="modern-card card h-100 p-4 shadow-sm border-0">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Ingreso Rápido de Notas</h5>
                            <span className="small text-muted">Último curso: Matemáticas 5to B</span>
                        </div>
                        
                        <div className="alert bg-light border-0 rounded-4 p-4 mb-4">
                            <div className="d-flex align-items-center">
                                <div className="stats-icon bg-primary text-white me-3">
                                    <i className="bi bi-info-circle"></i>
                                </div>
                                <p className="mb-0 small text-secondary">
                                    <strong>Nota:</strong> El sistema bloqueará automáticamente el ingreso de notas si el alumno tiene más del 30% de inasistencias injustificadas.
                                </p>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover table-modern">
                                <thead>
                                    <tr>
                                        <th>ALUMNO</th>
                                        <th>TAREAS</th>
                                        <th>EXAMEN</th>
                                        <th>PROMEDIO</th>
                                        <th>ESTADO</th>
                                        <th className="text-end">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Juan Perez', t: 15, e: 14, avg: 14.5, s: 'Regular' },
                                        { name: 'Maria Lopez', t: 19, e: 18, avg: 18.5, s: 'Excelente' },
                                        { name: 'Carlos Ruiz', t: 11, e: 10, avg: 10.5, s: 'Riesgo' },
                                    ].map((s, i) => (
                                        <tr key={i}>
                                            <td className="fw-bold">{s.name}</td>
                                            <td><input type="number" className="form-control form-control-sm w-50 border-0 bg-light text-center" defaultValue={s.t} /></td>
                                            <td><input type="number" className="form-control form-control-sm w-50 border-0 bg-light text-center" defaultValue={s.e} /></td>
                                            <td className="fw-bold text-primary">{s.avg}</td>
                                            <td><span className={`badge-soft badge rounded-pill bg-${s.avg >= 16 ? 'success' : s.avg >= 11 ? 'info' : 'danger'}-subtle text-${s.avg >= 16 ? 'success' : s.avg >= 11 ? 'info' : 'danger'}`}>{s.s}</span></td>
                                             <td className="text-end">
                                                <button className="btn btn-sm btn-light rounded-pill px-3 shadow-sm border" onClick={() => setModal({
                                                    show: true,
                                                    title: `Observación: ${s.name}`,
                                                    message: `Registre la observación para el seguimiento académico de este alumno.`,
                                                    type: 'info'
                                                })}>
                                                    <i className="bi bi-chat-dots me-1"></i>Obs.
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div className="text-end mt-4">
                            <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm" onClick={() => setModal({
                                show: true,
                                title: 'Sincronización Iniciada',
                                message: 'Las notas están siendo enviadas al registro central. El proceso se completará en unos minutos.',
                                type: 'success'
                            })}>
                                <i className="bi bi-cloud-upload me-2"></i>Sincronizar Notas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationModal 
                show={modal.show}
                onClose={() => setModal({ ...modal, show: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
        </div>
    );
};

export default ProfessorDashboard;
