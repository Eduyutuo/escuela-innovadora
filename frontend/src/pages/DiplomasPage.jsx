import React, { useState } from 'react';
import DiplomaModule from '../components/DiplomaModule';

const DiplomasPage = () => {
    const [showConfig, setShowConfig] = useState(false);
    return (
        <div className="py-2">
            <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1">Emisión de Certificados</h1>
                    <p className="text-secondary mb-0">Sistema oficial de generación y verificación de diplomas digitales.</p>
                </div>
                <div className="text-end">
                    <div className="badge bg-success-subtle text-success p-2 rounded-pill px-3 mb-2">
                        Certificación 2024
                    </div>
                </div>
            </header>

            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-success-subtle text-success mb-3">
                            <i className="bi bi-patch-check fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">Total Emitidos</p>
                        <h3 className="fw-bold mb-0">1,452</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-info-subtle text-info mb-3">
                            <i className="bi bi-clock-history fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">Pendientes</p>
                        <h3 className="fw-bold mb-0">28</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-primary-subtle text-primary mb-3">
                            <i className="bi bi-send fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">Enviados Hoy</p>
                        <h3 className="fw-bold mb-0">15</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="modern-card card h-100 p-3 shadow-sm border-0">
                        <div className="stats-icon bg-warning-subtle text-warning mb-3">
                            <i className="bi bi-exclamation-octagon fs-4"></i>
                        </div>
                        <p className="text-secondary small fw-bold text-uppercase mb-1">Observados</p>
                        <h3 className="fw-bold mb-0">3</h3>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-xl-9">
                    <DiplomaModule />
                </div>
            </div>

            <div className="mt-5 p-4 glass-card border-0 shadow-sm">
                <div className="d-flex align-items-center gap-4">
                    <div className="bg-white p-3 rounded-4 shadow-sm border border-secondary border-opacity-10">
                        <i className="bi bi-qr-code fs-1 text-primary"></i>
                    </div>
                    <div>
                        <h5 className="fw-bold mb-1">Verificación por QR</h5>
                        <p className="text-secondary mb-0">Todos los diplomas emitidos incluyen un código QR único para validación institucional inmediata por terceros.</p>
                    </div>
                    <button className="btn btn-primary rounded-pill px-4 ms-auto fw-bold" onClick={() => setShowConfig(true)}>Configurar Plantilla</button>
                </div>
            </div>

            {/* Config Template Modal */}
            {showConfig && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1060 }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border overflow-hidden" style={{ maxWidth: '600px', width: '95%' }}>
                        <div className="p-4 border-bottom bg-primary text-white">
                            <h5 className="fw-bold mb-0">Configuración de Plantilla de Diploma</h5>
                        </div>
                        <div className="p-4">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">LOGO INSTITUCIONAL</label>
                                <div className="border border-dashed rounded-4 p-4 text-center bg-light">
                                    <i className="bi bi-cloud-arrow-up fs-2 text-primary d-block mb-2"></i>
                                    <span className="small text-muted">Arrastra tu logo aquí o haz clic para subir</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">TEXTO DE CABECERA</label>
                                <input type="text" className="form-control rounded-pill px-3" defaultValue="Escuela Innovadora" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-secondary">FIRMAS AUTORIZADAS</label>
                                <div className="form-check form-switch mb-2">
                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                    <label className="form-check-label small">Director General</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                    <label className="form-check-label small">Secretaría Académica</label>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-pill flex-grow-1 fw-bold" onClick={() => setShowConfig(false)}>CANCELAR</button>
                                <button className="btn btn-primary rounded-pill flex-grow-1 fw-bold" onClick={() => { alert('Configuración guardada satisfactoriamente.'); setShowConfig(false); }}>GUARDAR CAMBIOS</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiplomasPage;
