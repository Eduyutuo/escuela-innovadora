import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentRoster from '../components/StudentRoster';
import DiplomaModule from '../components/DiplomaModule';

const SecretariaDashboard = () => {
    const [showGuide, setShowGuide] = useState(false);
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Secretaría Académica</h1>
                    <p className="text-secondary mb-0">Gestión de matrículas, registros y certificaciones institucionales.</p>
                </div>
                <div className="text-end d-none d-md-block">
                    <div className="badge bg-primary-subtle text-primary p-2 rounded-pill px-3 mb-2">
                        Año Escolar 2024
                    </div>
                </div>
            </header>

            {/* Acciones Rápidas / Estadísticas */}
            <div className="row g-4 mb-5">
                {[
                    { label: 'Matrículas hoy', value: '12', color: 'primary', icon: 'bi-person-plus', trend: 'Alta demanda', link: '/matriculas' },
                    { label: 'Pendientes Pago', value: '8', color: 'warning', icon: 'bi-cash-stack', trend: 'Cobranza', link: '#' },
                    { label: 'Diplomas Emitidos', value: '145', color: 'success', icon: 'bi-patch-check', trend: '+15 hoy', link: '/diplomas' },
                    { label: 'Citas Apoderados', value: '4', color: 'info', icon: 'bi-calendar-event', trend: 'Hoy', link: '#' },
                ].map((item, idx) => (
                    <div className="col-md-3" key={idx}>
                        <Link to={item.link} className="text-decoration-none">
                            <div className="modern-card card h-100 p-3 shadow-sm border-0 hover-up">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className={`stats-icon bg-${item.color}-subtle text-${item.color}`}>
                                        <i className={`bi ${item.icon} fs-4`}></i>
                                    </div>
                                    <span className={`small fw-bold text-${item.color}`}>{item.trend}</span>
                                </div>
                                <p className="text-secondary small fw-bold text-uppercase mb-1">{item.label}</p>
                                <h2 className="fw-bold mb-0 text-dark">{item.value}</h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                {/* Tabla Principal de Matrículas */}
                <div className="col-xl-7">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Resumen de Matrículas</h5>
                        <Link to="/matriculas" className="btn btn-sm btn-outline-primary rounded-pill px-3">Ver Todo</Link>
                    </div>
                    <StudentRoster />
                </div>

                {/* Módulo de Emisión de Diplomas */}
                <div className="col-xl-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Certificaciones Recientes</h5>
                        <Link to="/diplomas" className="btn btn-sm btn-outline-success rounded-pill px-3">Ir al Módulo</Link>
                    </div>
                    <DiplomaModule />
                </div>
            </div>
            
            <div className="mt-5">
                <div className="modern-card card p-4 bg-primary text-white border-0 overflow-hidden position-relative">
                    <div className="position-relative z-1">
                        <h4 className="fw-bold mb-2">Tutorial: Cierre de Matrículas Extemporáneas</h4>
                        <p className="opacity-75 mb-4 w-75">Aprende a procesar registros fuera de fecha según el reglamento ministerial 2024.</p>
                        <button className="btn btn-light rounded-pill px-4 fw-bold" onClick={() => setShowGuide(true)}>Ver Guía Interactiva</button>
                    </div>
                    <i className="bi bi-journal-check position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '10rem', transform: 'translate(20%, 20%)' }}></i>
                </div>
            </div>

            {/* Modal de Guía Interactiva */}
            {showGuide && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1060 }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border overflow-hidden" style={{ maxWidth: '700px', width: '95%' }}>
                        <div className="p-4 border-bottom bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Guía Interactiva: Gestión 2024</h5>
                            <button className="btn-close btn-close-white" onClick={() => setShowGuide(false)}></button>
                        </div>
                        <div className="p-5 text-center">
                            <i className="bi bi-rocket-takeoff display-1 text-primary mb-4 animate-bounce"></i>
                            <h3 className="fw-bold">¡Bienvenida a la Guía Rápida!</h3>
                            <p className="text-secondary mb-5 px-lg-5">Sigue estos pasos para gestionar las matrículas extemporáneas de forma eficiente y bajo normativa.</p>
                            
                            <div className="row g-3 text-start mb-5">
                                <div className="col-md-4">
                                    <div className="p-3 bg-light rounded-4 h-100">
                                        <div className="badge bg-primary mb-2">Paso 1</div>
                                        <p className="small mb-0 fw-bold">Verificar Documentación</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 bg-light rounded-4 h-100">
                                        <div className="badge bg-primary mb-2">Paso 2</div>
                                        <p className="small mb-0 fw-bold">Cargar en el SIAGIE</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 bg-light rounded-4 h-100">
                                        <div className="badge bg-primary mb-2">Paso 3</div>
                                        <p className="small mb-0 fw-bold">Emitir Constancia</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow" onClick={() => setShowGuide(false)}>COMENZAR TUTORIAL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecretariaDashboard;
