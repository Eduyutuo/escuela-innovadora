import React, { useState } from 'react';
import NotificationModal from '../components/NotificationModal';

const IncidentsPage = () => {
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info' });

    // Datos simulados de incidencias localizados
    const incidentesRecientes = [
        { titulo: 'Vidrio Roto', ubicacion: 'Aula 302', fecha: 'Hoy, 09:15', estado: 'En Proceso', color: 'warning' },
        { titulo: 'Fuga de Agua', ubicacion: 'Baños Varones B', fecha: 'Ayer, 16:30', estado: 'Atendido', color: 'success' },
        { titulo: 'Falla Eléctrica', ubicacion: 'Laboratorio 1', fecha: '15 Mar, 08:45', estado: 'Pendiente', color: 'danger' },
    ];

    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1 text-primary">Centro de Control e Incidencias</h1>
                    <p className="text-secondary mb-0 small">Gestión de seguridad, reportes de infraestructura y protocolos de emergencia institucional.</p>
                </div>
                <div className="text-end">
                    <div className="badge bg-danger-subtle text-danger p-2 rounded-pill px-3 mb-2 shadow-sm border border-danger border-opacity-25">
                        <i className="bi bi-exclamation-triangle-fill me-1"></i> Estado: Alerta Preventiva
                    </div>
                </div>
            </header>

            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="modern-card card p-4 shadow-sm border-0 bg-primary text-white h-100 overflow-hidden position-relative rounded-5 shadow-lg">
                        <div className="position-relative z-1">
                            <h5 className="fw-bold mb-3">Registrar Nuevo Reporte</h5>
                            <p className="small opacity-75 mb-4">Informe incidentes de seguridad, comportamiento o mantenimiento de forma inmediata.</p>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-bold opacity-75">TIPO DE INCIDENCIA</label>
                                <select className="form-select border-0 bg-white bg-opacity-20 text-white rounded-pill px-3 shadow-inner">
                                    <option className="text-dark">Falla de Infraestructura</option>
                                    <option className="text-dark">Emergencia Médica</option>
                                    <option className="text-dark">Seguridad / Vigilancia</option>
                                    <option className="text-dark">Incidentes de Disciplina</option>
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold opacity-75">DETALLES DEL SUCESO</label>
                                <textarea className="form-control border-0 bg-white bg-opacity-20 text-white rounded-4 px-3" rows="3" placeholder="Describa brevemente lo ocurrido..."></textarea>
                            </div>

                             <button 
                                className="btn btn-light w-100 rounded-pill py-3 fw-bold text-primary shadow-lg border-0 transition-hover"
                                onClick={() => setModal({
                                    show: true,
                                    title: 'Reporte Enviado',
                                    message: 'El reporte ha sido enviado con éxito al personal de seguridad y administración. Se le notificará sobre la resolución.',
                                    type: 'success'
                                })}
                            >
                                <i className="bi bi-megaphone-fill me-2"></i>NOTIFICAR AHORA
                            </button>
                        </div>
                        <i className="bi bi-shield-exclamation position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '12rem', transform: 'translate(20%, 20%)' }}></i>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="modern-card card p-4 shadow-sm border-0 rounded-5 h-100 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0 text-dark"><i className="bi bi-list-check me-2 text-primary"></i>Historial de Intervenciones</h5>
                            <button className="btn btn-sm btn-light rounded-pill px-3 border shadow-sm">Ver Todo</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-modern align-middle">
                                <thead>
                                    <tr className="smaller text-secondary text-uppercase border-bottom">
                                        <th>INCIDENCIA</th>
                                        <th>UBICACIÓN</th>
                                        <th>FECHA / HORA</th>
                                        <th>ESTADO</th>
                                        <th className="text-end">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidentesRecientes.map((item, idx) => (
                                        <tr key={idx} className="animate-fade-in border-bottom-0">
                                            <td className="fw-bold text-dark">{item.titulo}</td>
                                            <td className="small text-secondary">{item.ubicacion}</td>
                                            <td className="small text-muted">{item.fecha}</td>
                                            <td>
                                                <span className={`badge rounded-pill bg-${item.color}-subtle text-${item.color} border border-${item.color} border-opacity-25 px-3 py-2`}>
                                                    {item.estado}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <button className="btn btn-sm btn-light rounded-circle border shadow-sm hover-scale" title="Ver Detalles">
                                                    <i className="bi bi-eye text-primary"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-5 p-4 modern-card card border-0 shadow-sm bg-light rounded-5 border">
                <h5 className="fw-bold mb-4 text-primary"><i className="bi bi-shield-lock me-2"></i>Protocolos de Emergencia Activos</h5>
                <div className="row g-4 text-dark">
                    {[
                        { title: 'Evacuación por Sismo', icon: 'bi-box-arrow-right', color: 'primary' },
                        { title: 'Primeros Auxilios', icon: 'bi-heart-pulse', color: 'danger' },
                        { title: 'Protocolo de Incendio', icon: 'bi-fire', color: 'warning' },
                        { title: 'Cierre de Planta', icon: 'bi-key', color: 'dark' },
                    ].map((p, i) => (
                        <div className="col-md-3" key={i}>
                            <div 
                                className="p-4 bg-white rounded-4 shadow-sm border border-secondary border-opacity-10 text-center hover-up transition-base cursor-pointer shadow-hover"
                                 onClick={() => setModal({
                                    show: true,
                                    title: `Protocolo: ${p.title}`,
                                    message: `EL PROTOCOLO DE SEGURIDAD HA SIDO ACTIVADO.\n\nPor favor, diríjase a las zonas seguras o puntos de reunión designados. Mantenga la calma. El personal de apoyo guiará el proceso.`,
                                    type: 'warning'
                                })}
                            >
                                <i className={`bi ${p.icon} display-5 text-${p.color} mb-3 d-block`}></i>
                                <h6 className="fw-bold mb-0 small">{p.title}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <NotificationModal 
                show={modal.show}
                onClose={() => setModal({ ...modal, show: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
            <style jsx>{`
                .transition-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
                .shadow-hover:hover { box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; transform: translateY(-5px); }
                .hover-scale:hover { transform: scale(1.1); transition: transform 0.2s; }
                .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06); }
            `}</style>
        </div>
    );
};

export default IncidentsPage;
