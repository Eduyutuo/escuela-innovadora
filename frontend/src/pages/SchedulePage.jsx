import React, { useState } from 'react';

const SchedulePage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('5to B Secundaria');
    
    const days = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];
    const hours = ['08:00 - 09:30', '09:30 - 11:00', '11:00 - 11:30', '11:30 - 13:00', '13:00 - 14:30'];
    
    const scheduleData = {
        '5to B Secundaria': {
            '08:00 - 09:30': ['Matemáticas', 'Física', 'Álgebra', 'Matemáticas', 'Cómputo'],
            '09:30 - 11:00': ['Matemáticas', 'Física', 'Álgebra', 'Matemáticas', 'Planificación'],
            '11:00 - 11:30': ['RECREO', 'RECREO', 'RECREO', 'RECREO', 'RECREO'],
            '11:30 - 13:00': ['Geometría', 'Laboratorio', 'Geometría', 'Geometría', 'Coordinación'],
            '13:00 - 14:30': ['Tutoría', 'Deportes', 'Cívica', 'Inglés', 'Salida']
        },
        '4to A Secundaria': {
            '08:00 - 09:30': ['Historia', 'Lenguaje', 'Historia', 'Arte', 'Taller'],
            '09:30 - 11:00': ['Geografía', 'Inglés', 'Química', 'Física', 'Laboratorio'],
            '11:00 - 11:30': ['RECREO', 'RECREO', 'RECREO', 'RECREO', 'RECREO'],
            '11:30 - 13:00': ['Matemáticas', 'Matemáticas', 'Física', 'Química', 'Cierre'],
            '13:00 - 14:30': ['Deportes', 'Deportes', 'Música', 'Religión', 'Salida']
        },
        '1ro C Primaria': {
            '08:00 - 09:30': ['Comunicación', 'Lógico Mat.', 'Comunicación', 'Ciencia', 'Arte'],
            '09:30 - 11:00': ['Lógico Mat.', 'Psicomotricidad', 'Lógico Mat.', 'Personal Soc.', 'Religión'],
            '11:00 - 11:30': ['LONCHERA', 'LONCHERA', 'LONCHERA', 'LONCHERA', 'LONCHERA'],
            '11:30 - 13:00': ['Inglés', 'Inglés', 'Taller', 'Cómputo', 'Cierres'],
            '13:00 - 14:30': ['Manualidades', 'Recreo Dirigido', 'Dibujo', 'Salida', 'Salida']
        }
    };

    const currentSchedule = scheduleData[selectedCourse] || {};

    return (
        <div className="py-2 container-fluid px-lg-4">
            <header className="mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2 no-print">
                <div className="flex-grow-1">
                    <h4 className="fw-bold text-primary mb-0"><i className="bi bi-calendar3-range me-2"></i>Horario Escolar 2024</h4>
                    <p className="text-secondary smaller mb-0">Gestión de bloques horarios y carga académica por sección.</p>
                </div>
                <div className="d-flex gap-2 flex-wrap align-items-center mt-2 mt-md-0">
                    <div className="input-group input-group-sm shadow-sm border rounded-pill overflow-hidden bg-white">
                        <span className="input-group-text bg-light border-0 text-muted smaller px-3 fw-bold">SECCIÓN:</span>
                        <select 
                            className="form-select border-0 px-3 fw-bold text-primary" 
                            style={{ minWidth: '160px', fontSize: '0.85rem' }}
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option>5to B Secundaria</option>
                            <option>4to A Secundaria</option>
                            <option>1ro C Primaria</option>
                        </select>
                    </div>
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold border-2 transition-base" onClick={() => setShowEdit(true)}>
                        <i className="bi bi-pencil-fill me-1"></i>EDITAR
                    </button>
                    <button className="btn btn-sm btn-primary rounded-pill px-4 fw-bold shadow-sm bg-gradient-primary border-0" onClick={() => window.print()}>
                        <i className="bi bi-printer-fill me-1"></i>PDF
                    </button>
                </div>
            </header>

            <div className="modern-card card p-0 shadow-lg border-0 overflow-hidden mb-4 rounded-5 border-top border-4 border-primary">
                <div className="table-responsive schedule-scroll-container">
                    <table className="table table-bordered mb-0 table-schedule align-middle border-light">
                        <thead className="text-center sticky-top">
                            <tr className="bg-gradient-primary text-white border-bottom-0">
                                <th style={{ width: '120px', fontSize: '0.75rem' }} className="py-3 border-0 bg-primary">HORARIO</th>
                                {days.map(day => (
                                    <th key={day} style={{ fontSize: '0.8rem', letterSpacing: '1px', minWidth: '140px' }} className="py-3 border-0 bg-primary">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(hour => (
                                <tr key={hour} style={{ height: '70px' }}>
                                    <td className="text-center fw-bold bg-light text-primary border-light py-2">
                                        <div style={{ fontSize: '0.75rem' }}>{hour}</div>
                                    </td>
                                    {days.map((_, idx) => {
                                        const course = currentSchedule[hour] ? currentSchedule[hour][idx] : null;
                                        const isReceso = course === 'RECREO' || course === 'LONCHERA';
                                        
                                        return (
                                            <td key={idx} className={`p-1 border-light position-relative ${isReceso ? 'bg-warning bg-opacity-5' : ''}`}>
                                                {course && !isReceso && (
                                                    <div 
                                                        className="course-card p-2 rounded-4 shadow-sm bg-white border-start border-4 border-primary h-100 d-flex flex-column justify-content-center transition-base"
                                                    >
                                                        <div className="fw-bold text-dark lh-sm mb-1" style={{ fontSize: '0.85rem' }}>{course}</div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="text-primary fw-bold" style={{ fontSize: '0.6rem' }}><i className="bi bi-geo-alt-fill me-1"></i>Aula 204</span>
                                                            <span className="text-muted" style={{ fontSize: '0.6rem' }}><i className="bi bi-person-fill"></i> Titular</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {isReceso && (
                                                    <div className="d-flex align-items-center justify-content-center h-100 text-warning fw-bold smaller opacity-75">
                                                        <i className="bi bi-cup-straw me-2"></i>{course}
                                                    </div>
                                                )}
                                                {!course && <div className="text-muted opacity-25 text-center smaller">-</div>}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row g-3 no-print mb-4">
                <div className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-5 p-3 bg-white h-100">
                        <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-info-circle-fill text-primary me-2"></i>
                            <h6 className="mb-0 fw-bold smaller">Información de Carga</h6>
                        </div>
                        <div className="progress rounded-pill mb-2" style={{ height: '6px' }}>
                            <div className="progress-bar bg-primary" style={{ width: '85%' }}></div>
                        </div>
                        <p className="smaller text-muted mb-0">85% de avance currícular registrado.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-8">
                    <div className="card border-0 shadow-sm rounded-5 p-3 bg-light-subtle h-100">
                        <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-megaphone-fill text-warning me-2"></i>
                            <h6 className="mb-0 fw-bold smaller">Avisos Académicos</h6>
                        </div>
                        <p className="smaller text-secondary mb-0">Las evaluaciones trimestrales inician el 25 de Marzo para todos los niveles de secundaria.</p>
                    </div>
                </div>
            </div>

            {showEdit && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border-0 overflow-hidden animate-slide-up" style={{ maxWidth: '400px', width: '95%' }}>
                        <div className="p-4 bg-primary text-white text-center bg-gradient-primary">
                            <h6 className="fw-bold mb-0">Solicitud de Modificación</h6>
                        </div>
                        <div className="p-4 text-center">
                            <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                                <i className="bi bi-lock-fill h4 text-primary mb-0"></i>
                            </div>
                            <h6 className="fw-bold mb-2">Módulo Restringido</h6>
                            <p className="text-secondary smaller mb-4">Para realizar cambios en el horario maestro, debe contactar con la Dirección Académica para la validación de horas.</p>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary rounded-pill fw-bold py-2 shadow-sm border-0 bg-gradient-primary" onClick={() => { alert('Solicitud enviada.'); setShowEdit(false); }}>
                                    SOLICITAR CAMBIO
                                </button>
                                <button className="btn btn-light rounded-pill fw-bold py-2 text-secondary smaller" onClick={() => setShowEdit(false)}>CANCELAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .bg-gradient-primary { background: linear-gradient(45deg, #1a237e, #311b92); }
                .schedule-scroll-container { 
                    max-height: 500px; 
                    overflow-y: auto; 
                }
                .course-card:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important; border-color: #ffd600 !important; }
                .transition-base { transition: all 0.2s ease; }
                @media print {
                    .no-print { display: none !important; }
                    .schedule-scroll-container { max-height: none !important; overflow: visible !important; }
                    .modern-card { box-shadow: none !important; border: 1px solid #ddd !important; border-radius: 0 !important; }
                }
                @media (max-width: 992px) {
                    .schedule-scroll-container { max-height: 400px; }
                }
            `}</style>
        </div>
    );
};

export default SchedulePage;
