import React, { useState, useEffect, useMemo } from 'react';
import NotificationModal from '../components/NotificationModal';

// Datos compartidos fuera del componente para evitar reinicializaciones en cada render
const INITIAL_STUDENT_DATA = {
    'Matemáticas 5to B': [
        { id: 1, nombre: 'Juan Perez', practicas: 14, tareas: 15, examen: 14, estado: 'Regular' },
        { id: 2, nombre: 'Maria Lopez', practicas: 18, tareas: 19, examen: 18, estado: 'Excelente' },
        { id: 3, nombre: 'Carlos Ruiz', practicas: 10, tareas: 11, examen: 10, estado: 'Riesgo' },
        { id: 4, nombre: 'Ana Garcia', practicas: 16, tareas: 17, examen: 15, estado: 'Bueno' },
        { id: 5, nombre: 'Luis Torres', practicas: 12, tareas: 13, examen: 11, estado: 'Regular' },
    ],
    'Álgebra 4to A': [
        { id: 6, nombre: 'Roberto Mendez', practicas: 15, tareas: 14, examen: 15, estado: 'Bueno' },
        { id: 7, nombre: 'Lucia Diaz', practicas: 19, tareas: 20, examen: 19, estado: 'Excelente' },
    ],
    'Geometría 3ro C': [
        { id: 8, nombre: 'Mario Bros', practicas: 11, tareas: 12, examen: 11, estado: 'Regular' },
    ]
};

const GradesPage = () => {
    // Estados para sincronización, selección y modales
    const [isSyncing, setIsSyncing] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('Matemáticas 5to B');
    const [selectedPeriod, setSelectedPeriod] = useState('Bimestre I');
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info', onConfirm: null });

    // Estado local persistente para las notas de todos los alumnos de todos los cursos
    const [allGrades, setAllGrades] = useState(INITIAL_STUDENT_DATA);
    const [isSaving, setIsSaving] = useState(false);

    // Estudiantes actuales basados en el curso seleccionado
    const students = useMemo(() => allGrades[selectedCourse] || [], [allGrades, selectedCourse]);

    // Función para sincronizar con sistema oficial
    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setModal({
                show: true,
                title: 'Sincronización Exitosa',
                message: '¡Confirmado! Las notas han sido enviadas al SIAGIE sin errores.',
                type: 'success'
            });
        }, 2000);
    };

    // Actualizar una nota específica en el estado global de notas
    const updateGrade = (id, field, value) => {
        let val = parseFloat(value);
        if (isNaN(val)) val = 0;
        if (val > 20) val = 20;
        if (val < 0) val = 0;

        setIsSaving(true);
        setAllGrades(prev => {
            const updatedCourseData = prev[selectedCourse].map(s => 
                s.id === id ? { ...s, [field]: val } : s
            );
            return { ...prev, [selectedCourse]: updatedCourseData };
        });
        
        // Simular auto-guardado visual
        setTimeout(() => setIsSaving(false), 800);
    };

    // Calcular promedio
    const calculateAvg = (s) => ((s.practicas + s.tareas + s.examen) / 3).toFixed(1);

    // Obtener estado académico basado en promedio
    const getAcademicStatus = (avg) => {
        if (avg >= 17) return { s: 'Excelente', color: 'success' };
        if (avg >= 14) return { s: 'Bueno', color: 'success' };
        if (avg >= 11) return { s: 'Regular', color: 'info' };
        return { s: 'Riesgo', color: 'danger' };
    };

    // Exportar datos a formato CSV profesional
    const exportToExcel = () => {
        setModal({
            show: true,
            title: 'Generando Reporte...',
            message: `Estamos procesando el historial de calificaciones para ${selectedCourse}. Por favor espere...`,
            type: 'info'
        });

        setTimeout(() => {
            const title = "REPORTE OFICIAL DE CALIFICACIONES - COLEGIO INNOVA\n";
            const metadata = `Curso: ${selectedCourse} | Periodo: ${selectedPeriod} | Fecha: ${new Date().toLocaleDateString()}\n\n`;
            const headers = "Nombre Estudiante,Prácticas,Tareas,Examen Mensual,Promedio Final,Estado Académico\n";
            
            const rows = students.map(s => {
                const avg = calculateAvg(s);
                const status = getAcademicStatus(avg).s;
                return `${s.nombre},${s.practicas},${s.tareas},${s.examen},${avg},${status}`;
            }).join("\n");
            
            const footer = "\n\nGenerado por el sistema de Gestión Escolar v2.0";
            
            const blob = new Blob([title + metadata + headers + rows + footer], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', `Reporte_Notas_${selectedCourse.replace(/\s+/g, '_')}.csv`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setModal({
                show: true,
                title: '¡Exportación Exitosa!',
                message: `El archivo "Reporte_Notas_${selectedCourse.replace(/\s+/g, '_')}.csv" se ha descargado correctamente.`,
                type: 'success'
            });
        }, 1500);
    };

    return (
        <div className="py-1">
            <header className="mb-4 d-flex justify-content-between align-items-end flex-wrap gap-2">
                <div>
                    <h2 className="fw-bold gradient-text mb-0 text-primary">Registro de Calificaciones</h2>
                    <p className="text-secondary small mb-0">Gestión de promedios, evaluaciones y cierre de periodos escolares (Sistema SIAGIE v2.0).</p>
                </div>
                <div className="text-end">
                    <div className="badge bg-primary-subtle text-primary p-2 rounded-pill px-3 shadow-sm border border-primary border-opacity-10">
                        <i className="bi bi-journal-bookmark-fill me-1"></i> {selectedCourse}
                    </div>
                </div>
            </header>

            <div className="modern-card card p-3 shadow-sm border-0 mb-4 rounded-4 position-relative overflow-hidden">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 position-relative z-1">
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex flex-column">
                            <label className="smaller text-muted fw-bold mb-1 ps-2">MATERIA / GRADO</label>
                            <select 
                                className="form-select form-select-sm rounded-pill px-3 border-light shadow-sm bg-light fw-bold" 
                                style={{ width: '220px' }}
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option>Matemáticas 5to B</option>
                                <option>Álgebra 4to A</option>
                                <option>Geometría 3ro C</option>
                            </select>
                        </div>
                        <div className="d-flex flex-column">
                            <label className="smaller text-muted fw-bold mb-1 ps-2">PERIODO</label>
                            <select 
                                className="form-select form-select-sm rounded-pill px-3 border-light shadow-sm bg-light fw-bold" 
                                style={{ width: '130px' }}
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                            >
                                <option>Bimestre I</option>
                                <option>Bimestre II</option>
                                <option>Bimestre III</option>
                                <option>Bimestre IV</option>
                            </select>
                        </div>
                        {isSaving && (
                            <div className="ms-2 mt-4 animate-pulse">
                                <span className="badge bg-success-subtle text-success rounded-pill px-3 px-2">
                                    <i className="bi bi-cloud-check me-1"></i>AUTO-GUARDADO
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-success rounded-pill px-4 fw-bold shadow-sm transition-base hover-scale" onClick={exportToExcel}>
                            <i className="bi bi-file-earmark-spreadsheet me-2"></i>Exportar Excel
                        </button>
                        <button className="btn btn-sm btn-primary rounded-pill px-4 fw-bold shadow-sm bg-gradient-primary border-0 transition-base hover-scale" onClick={handleSync} disabled={isSyncing}>
                            {isSyncing ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-cloud-upload me-2"></i>}
                            {isSyncing ? 'Sincronizando...' : 'Sincronizar SIAGIE Local'}
                        </button>
                    </div>
                </div>

                <div className="table-responsive position-relative z-1">
                    <table className="table table-hover table-modern align-middle" style={{ minWidth: '800px' }}>
                        <thead>
                            <tr className="text-secondary smaller text-uppercase border-bottom">
                                <th className="ps-4">ESTUDIANTE</th>
                                <th className="text-center">PRÁCTICAS (40%)</th>
                                <th className="text-center">TAREAS (20%)</th>
                                <th className="text-center">EXAMEN (40%)</th>
                                <th className="text-center text-primary">PROM. FINAL</th>
                                <th className="text-center">ESTADO</th>
                                <th className="text-end px-4">OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => {
                                const avg = calculateAvg(s);
                                const status = getAcademicStatus(avg);
                                return (
                                    <tr key={s.id} className="animate-fade-in border-bottom-0">
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark">{s.nombre}</div>
                                            <div className="smaller text-secondary font-monospace">ID: 2024-00{s.id}</div>
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                className={`form-control form-control-sm mx-auto border-0 text-center fw-bold rounded-3 transition-base ${s.practicas < 11 ? 'bg-danger-subtle text-danger shadow-sm' : 'bg-light text-primary'}`} 
                                                style={{ width: '60px' }}
                                                value={s.practicas} 
                                                onChange={(e) => updateGrade(s.id, 'practicas', e.target.value)}
                                                min="0" max="20"
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                className={`form-control form-control-sm mx-auto border-0 text-center fw-bold rounded-3 transition-base ${s.tareas < 11 ? 'bg-danger-subtle text-danger shadow-sm' : 'bg-light text-primary'}`} 
                                                style={{ width: '60px' }}
                                                value={s.tareas} 
                                                onChange={(e) => updateGrade(s.id, 'tareas', e.target.value)}
                                                min="0" max="20"
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                className={`form-control form-control-sm mx-auto border-0 text-center fw-bold rounded-3 transition-base ${s.examen < 11 ? 'bg-danger-subtle text-danger shadow-sm' : 'bg-light text-primary'}`} 
                                                style={{ width: '60px' }}
                                                value={s.examen} 
                                                onChange={(e) => updateGrade(s.id, 'examen', e.target.value)}
                                                min="0" max="20"
                                            />
                                        </td>
                                        <td className="text-center">
                                            <span className={`fw-bold fs-5 p-2 rounded-3 ${avg < 11 ? 'text-danger bg-danger-subtle px-3' : 'text-primary'}`}>{avg}</span>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge rounded-pill px-3 py-2 bg-${status.color}-subtle text-${status.color} border border-${status.color} border-opacity-25`}>
                                                {status.s}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button 
                                                className={`btn btn-sm rounded-pill px-4 border-2 shadow-sm transition-all fw-bold ${modal.openId === s.id ? 'btn-primary border-primary text-white' : 'btn-outline-primary'}`}
                                                onClick={() => setModal(prev => ({ ...prev, openId: prev.openId === s.id ? null : s.id }))}
                                            >
                                                <i className="bi bi-pencil-fill me-2"></i>Gestionar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Slide-over Action Panel for Grades */}
            {modal.openId && (
                <>
                    <div className="side-panel-overlay animate-fade-in" onClick={() => setModal(prev => ({ ...prev, openId: null }))}></div>
                    <div className="side-panel bg-white shadow-2xl animate-slide-in-right p-0 overflow-hidden">
                        {(() => {
                            const student = students.find(s => s.id === modal.openId);
                            if (!student) return null;
                            const avg = calculateAverage(student);
                            return (
                                <div className="h-100 d-flex flex-column">
                                    <div className="p-4 bg-primary text-white bg-gradient-primary position-relative overflow-hidden">
                                        <div className="position-absolute top-0 end-0 p-3 opacity-10" style={{ fontSize: '100px', transform: 'translate(20%, -20%)' }}>
                                            <i className="bi bi-journal-check"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="badge bg-white text-primary rounded-pill fw-bold small text-uppercase px-3">Gestión de Notas</span>
                                                <button className="btn btn-link text-white p-0 fs-4" onClick={() => setModal(prev => ({ ...prev, openId: null }))}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center mb-1">
                                                <div className="bg-white text-primary rounded-circle p-2 me-3 fw-bold fs-4 d-flex align-items-center justify-content-center shadow-lg" style={{ width: '60px', height: '60px' }}>
                                                    {student.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <h5 className="fw-bold mb-0">{student.nombre}</h5>
                                                    <p className="smaller mb-0 opacity-75">Curso: {selectedCourse}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 flex-grow-1 overflow-auto">
                                        <div className="p-3 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-10 mb-4 text-center">
                                            <div className="smaller text-primary fw-bold mb-1">PROMEDIO ACTUAL</div>
                                            <div className="display-6 fw-bold text-primary">{avg}</div>
                                            <span className={`badge rounded-pill bg-${avg >= 11 ? 'success' : 'danger'}-subtle text-${avg >= 11 ? 'success' : 'danger'} smaller px-3`}>
                                                {avg >= 11 ? 'APROBADO' : 'DESAPROBADO'}
                                            </span>
                                        </div>

                                        <h6 className="fw-bold text-primary mb-3 text-uppercase smaller tracking-wider"><i className="bi bi-lightning-charge-fill me-2"></i>Herramientas de Evaluación</h6>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-primary transition-base" onClick={() => {
                                                setModal({
                                                    show: true,
                                                    title: `Observaciones: ${student.nombre}`,
                                                    message: `[ ] Falta entregar tarea final de geometría\n[ ] Participación destacada en clase de lógica\n[ ] Requiere reforzamiento académico inmediato`,
                                                    type: 'info'
                                                });
                                            }}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-chat-text text-primary fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Ver Observaciones</div>
                                                        <div className="smaller text-muted">Anotaciones del docente</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-warning transition-base" onClick={() => {
                                                setModal({
                                                    show: true,
                                                    title: `Control de Asistencia: ${student.nombre}`,
                                                    message: `Puntualidad: 95%\nInasistencias: 1 Justificada\nTardanzas: 2 leves\n\nÚltimo registro: ${new Date().toLocaleDateString()}`,
                                                    type: 'warning'
                                                });
                                            }}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-calendar-check text-warning fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Ver Asistencia</div>
                                                        <div className="smaller text-muted">Registro diario en este curso</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-success transition-base" onClick={() => alert('Generando historial...')}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-file-earmark-person text-success fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Historial Académico</div>
                                                        <div className="smaller text-muted">Evolución de notas anual</div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-light border-top text-center mt-auto">
                                        <p className="smaller text-muted mb-0">Sistema de Evaluación v3.2 <br/> Escuela Innovadora © 2024</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </>
            )}

            <div className="alert bg-white border border-secondary border-opacity-10 rounded-4 p-4 d-flex align-items-center shadow-sm position-relative overflow-hidden">
                <div className="position-absolute h-100 top-0 start-0 bg-primary opacity-10" style={{ width: '4px' }}></div>
                <i className="bi bi-info-circle-fill fs-3 text-primary me-3"></i>
                <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1 text-dark text-uppercase smaller tracking-wider">Normativa de Cierre Académico</h6>
                    <p className="mb-0 small text-secondary">Asegúrese de sincronizar antes del 31 de marzo. El sistema bloquea ediciones posteriores al envío oficial al SIAGIE.</p>
                </div>
                <div className="ps-3 border-start">
                    <div className="smaller fw-bold text-muted mb-0">ESTADO SISTEMA</div>
                    <div className="small fw-bold text-success d-flex align-items-center"><i className="bi bi-check-circle-fill me-1"></i> EN LÍNEA</div>
                </div>
            </div>

            <NotificationModal 
                show={modal.show}
                onClose={() => setModal({ ...modal, show: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                onConfirm={modal.onConfirm}
            />
            <style jsx>{`
                .bg-gradient-primary { background: linear-gradient(135deg, #1e3a8a, #3b82f6); }
                .tracking-wider { letter-spacing: 0.05em; }
                .side-panel-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    z-index: 2000;
                }
                .side-panel {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 400px;
                    max-width: 100%;
                    z-index: 2001;
                    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease-in-out;
                    background: white;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
                .hover-primary:hover { border-color: #3b82f6 !important; background-color: #eff6ff !important; }
                .hover-warning:hover { border-color: #f59e0b !important; background-color: #fffbeb !important; }
                .hover-success:hover { border-color: #10b981 !important; background-color: #f0fdf4 !important; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                .transition-all { transition: all 0.2s ease; }
                .hover-scale:hover { transform: scale(1.15); }
                .transition-base { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
            `}</style>
        </div>
    );
};

export default GradesPage;
