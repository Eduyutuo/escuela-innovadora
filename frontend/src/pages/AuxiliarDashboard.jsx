import React, { useState } from 'react';
import NotificationModal from '../components/NotificationModal';

const AuxiliarDashboard = () => {
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info' });
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Seguridad e Infraestructura</h1>
                    <p className="text-secondary mb-0">Monitoreo de planta, reporte de incidentes y protocolos de emergencia.</p>
                </div>
                <div className="text-end d-none d-md-block">
                    <div className="badge bg-danger-subtle text-danger p-2 rounded-pill px-3 mb-2">
                        Estado: Alerta Preventiva
                    </div>
                </div>
            </header>

            <div className="row g-4">
                <div className="col-lg-5">
                    <div className="modern-card card p-4 shadow-sm border-0 bg-primary text-white overflow-hidden position-relative h-100">
                        <div className="position-relative z-1">
                            <h4 className="fw-bold mb-3">Reporte Rápido de Incidencias</h4>
                            <p className="opacity-75 mb-4 small">Use este formulario solo para reportar daños físicos, emergencias médicas o riesgos de seguridad inmediatos.</p>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-bold opacity-75">TIPO DE INCIDENTE</label>
                                <select className="form-select border-0 bg-white bg-opacity-10 text-white rounded-pill">
                                    <option className="text-dark">Daño de infraestructura</option>
                                    <option className="text-dark">Emergencia médica</option>
                                    <option className="text-dark">Riesgo eléctrico</option>
                                    <option className="text-dark">Otro</option>
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold opacity-75">UBICACIÓN</label>
                                <input type="text" className="form-control border-0 bg-white bg-opacity-10 text-white rounded-pill" placeholder="Ej: Pabellón C, Aula 201" />
                            </div>

                             <button 
                                className="btn btn-light w-100 rounded-pill py-2 fw-bold text-primary shadow"
                                onClick={() => setModal({
                                    show: true,
                                    title: 'Reporte Enviado',
                                    message: 'Su reporte ha sido recibido por el centro de control. Se ha notificado al personal de turno.',
                                    type: 'success'
                                })}
                            >
                                <i className="bi bi-megaphone-fill me-2"></i>ENVIAR REPORTE AHORA
                            </button>
                        </div>
                        <i className="bi bi-shield-exclamation position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '12rem', transform: 'translate(20%, 20%)' }}></i>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="modern-card card p-4 shadow-sm border-0 h-100">
                        <h5 className="fw-bold mb-4">Historial de Intervenciones</h5>
                        <div className="table-responsive">
                            <table className="table table-hover table-modern">
                                <thead>
                                    <tr>
                                        <th>INCIDENCIA</th>
                                        <th>LUGAR</th>
                                        <th>FECHA / HORA</th>
                                        <th>ESTADO</th>
                                        <th className="text-end">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { title: 'Vidrio Roto', loc: 'Aula 302', time: 'Hoy, 09:15', status: 'En Proceso', color: 'warning' },
                                        { title: 'Fuga de Agua', loc: 'Baños Varones B', time: 'Ayer, 16:30', status: 'Atendido', color: 'success' },
                                        { title: 'Luminaria Fundida', loc: 'Pasadizo 2do Piso', time: '15 Mar, 10:00', status: 'Pendiente', color: 'secondary' },
                                    ].map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="fw-bold">{item.title}</td>
                                            <td className="small text-secondary">{item.loc}</td>
                                            <td className="small">{item.time}</td>
                                            <td>
                                                <span className={`badge-soft badge rounded-pill bg-${item.color}-subtle text-${item.color}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                             <td className="text-end">
                                                <button className="btn btn-sm btn-light rounded-pill px-3 shadow-sm border" onClick={() => setModal({
                                                    show: true,
                                                    title: `Detalle: ${item.title}`,
                                                    message: `Intervención realizada en ${item.loc}. Estado actual: ${item.status}.`,
                                                    type: 'info'
                                                })}>
                                                    <i className="bi bi-eye me-1"></i>Ver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-auto text-center">
                            <button className="btn btn-link text-decoration-none small fw-bold mt-3">Ver bitácora completa →</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row g-4 mt-2">
                <div className="col-md-6">
                    <div className="glass-card p-4 border-0 shadow-sm d-flex align-items-center">
                        <div className="bg-warning-subtle text-warning p-3 rounded-circle me-4">
                            <i className="bi bi-briefcase-fill fs-2"></i>
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">Botiquines de Emergencia</h6>
                            <p className="small text-muted mb-0">Última revisión: 12 de Marzo. Próxima: 28 de Marzo.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="glass-card p-4 border-0 shadow-sm d-flex align-items-center">
                        <div className="bg-info-subtle text-info p-3 rounded-circle me-4">
                            <i className="bi bi-fire fs-2"></i>
                        </div>
                        <div>
                            <h6 className="fw-bold mb-1">Simulacro Programado</h6>
                            <p className="small text-muted mb-0">Evento: Sismo Intensidad 8.0. Fecha: 24 de Abril.</p>
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

export default AuxiliarDashboard;
