import React, { useState } from 'react';
import NotificationModal from './NotificationModal';

const StudentRoster = () => {
    // Filtros y estados del componente
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [showAddModal, setShowAddModal] = useState(false);
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info', onConfirm: null });
    
    // Datos de ejemplo localizados
    const [students, setStudents] = useState([
        { id: '2024-001', nombre: 'Juan Perez', grado: '5to Sec', estado: 'Matriculado', pago: 'Pagado', correo: 'j.perez@escuela.edu.pe' },
        { id: '2024-002', nombre: 'Maria Lopez', grado: '4to Sec', estado: 'Pre-Matricula', pago: 'Pendiente', correo: 'm.lopez@escuela.edu.pe' },
        { id: '2024-003', nombre: 'Carlos Ruiz', grado: '5to Sec', estado: 'Matriculado', pago: 'Pagado', correo: 'c.ruiz@escuela.edu.pe' },
        { id: '2024-004', nombre: 'Ana Belen', grado: '3to Prim', estado: 'Retirado', pago: 'N/A', correo: 'a.belen@escuela.edu.pe' },
        { id: '2024-005', nombre: 'Luis Garcia', grado: '1ro Sec', estado: 'Matriculado', pago: 'Pagado', correo: 'l.garcia@escuela.edu.pe' },
    ]);

    const [newStudent, setNewStudent] = useState({ nombre: '', grado: '1ro Sec', correo: '' });

    // Manejador para agregar nuevos alumnos
    const handleAddStudent = (e) => {
        e.preventDefault();
        const id = `2024-0${students.length + 1}`;
        const studentToAdd = {
            ...newStudent,
            id,
            estado: 'Pre-Matricula',
            pago: 'Pendiente'
        };
        setStudents([...students, studentToAdd]);
        setNewStudent({ nombre: '', grado: '1ro Sec', correo: '' });
        setShowAddModal(false);
        setModal({
            show: true,
            title: 'Registro Exitoso',
            message: `El alumno ${studentToAdd.nombre} ha sido registrado con éxito.`,
            type: 'success'
        });
    };

    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Función para eliminar/desvincular alumno
    const handleDelete = (id) => {
        setModal({
            show: true,
            title: 'Confirmar Acción',
            message: '¿Estás seguro de que deseas desvincular a este estudiante? Esta acción no se puede deshacer.',
            type: 'danger',
            confirmText: 'DESVINCULAR',
            onConfirm: () => {
                setStudents(students.filter(s => s.id !== id));
                setOpenDropdownId(null);
                setModal({ show: false });
            }
        });
    };

    // Función para editar alumno
    const handleEdit = (student) => {
        const newName = window.prompt('Editar nombre del estudiante:', student.nombre);
        if (newName) {
            setStudents(students.map(s => s.id === student.id ? { ...s, nombre: newName } : s));
            setModal({
                show: true,
                title: 'Cambios Guardados',
                message: `El nombre ha sido actualizado a: ${newName}`,
                type: 'success'
            });
        }
        setOpenDropdownId(null);
    };

    // Función para ver ficha detallada
    const handleView = (student) => {
        setModal({
            show: true,
            title: `Ficha del Estudiante: ${student.nombre}`,
            message: `ID: ${student.id}\nGrado: ${student.grado}\nEstado: ${student.estado}\nEmail: ${student.correo}\n\nPadre/Apoderado: Roberto Perez\nTeléfono: 998 776 554`,
            type: 'info'
        });
        setOpenDropdownId(null);
    };

    const filteredStudents = statusFilter === 'Todos' 
        ? students 
        : students.filter(s => s.estado === statusFilter);

    return (
        <div className="modern-card card p-4 shadow-sm border-0 position-relative rounded-5">
            {/* Overlay para cerrar el menú al hacer clic fuera */}
            {openDropdownId && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100" 
                    style={{ zIndex: 1040, background: 'rgba(0,0,0,0.01)', cursor: 'default' }} 
                    onClick={() => setOpenDropdownId(null)}
                ></div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h5 className="fw-bold mb-0 text-primary"><i className="bi bi-people-fill me-2"></i>Control de Matrículas</h5>
                <div className="d-flex gap-2 align-items-center">
                    <button className="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold border-2 shadow-sm" onClick={() => alert('Generando reporte consolidado de matrículas...')}>
                        <i className="bi bi-file-earmark-spreadsheet me-2"></i>EXPORTAR EXCEL
                    </button>
                    <div className="btn-group border rounded-pill overflow-hidden bg-light p-1 shadow-sm">
                        {['Todos', 'Matriculado', 'Pre-Matricula'].map(f => (
                            <button 
                                key={f}
                                className={`btn btn-sm border-0 rounded-pill px-3 fw-bold ${statusFilter === f ? 'btn-primary shadow-sm text-white' : 'btn-light text-secondary'}`}
                                onClick={() => setStatusFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold ms-lg-2" onClick={() => setShowAddModal(true)}>
                        <i className="bi bi-person-plus-fill me-2"></i>NUEVO ALUMNO
                    </button>
                </div>
            </div>

            <div className="table-responsive" style={{ minHeight: '350px' }}>
                <table className="table table-hover table-modern align-middle">
                    <thead>
                        <tr className="smaller text-secondary text-uppercase border-bottom">
                            <th className="ps-3">Estudiante</th>
                            <th>Grado</th>
                            <th>Estado</th>
                            <th className="text-center">Pago</th>
                            <th className="text-end pe-4">Accciones Rápidas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(s => (
                            <tr key={s.id} className="animate-fade-in border-bottom-0">
                                <td className="ps-3">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 text-primary rounded-pill p-2 me-3 small fw-bold d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '2px solid rgba(13, 110, 253, 0.2)' }}>
                                            {s.nombre.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="fw-bold text-dark">{s.nombre}</div>
                                            <div className="smaller text-muted font-monospace">{s.id} | {s.correo}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge bg-light text-dark border shadow-sm px-3 py-2 rounded-pill fw-medium">{s.grado}</span></td>
                                <td>
                                    <span className={`badge rounded-pill px-3 py-2 bg-${s.estado === 'Matriculado' ? 'success' : s.estado === 'Retirado' ? 'danger' : 'info'}-subtle text-${s.estado === 'Matriculado' ? 'success' : s.estado === 'Retirado' ? 'danger' : 'info'} border border-${s.estado === 'Matriculado' ? 'success' : s.estado === 'Retirado' ? 'danger' : 'info'} border-opacity-25`}>
                                        <i className={`bi bi-${s.estado === 'Matriculado' ? 'check-circle' : 'person-dash'} me-1`}></i> {s.estado}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className={`shadow-sm d-inline-block rounded-circle p-1 ${s.pago === 'Pagado' ? 'bg-success-subtle' : 'bg-warning-subtle'}`}>
                                        <i className={`bi bi-${s.pago === 'Pagado' ? 'check-circle-fill text-success' : 'clock-fill text-warning'} fs-5 px-1`}></i>
                                    </div>
                                </td>
                                <td className="text-end pe-3">
                                    <button 
                                        className={`btn btn-sm rounded-pill px-4 border-2 shadow-sm transition-all fw-bold ${openDropdownId === s.id ? 'btn-primary border-primary text-white' : 'btn-outline-primary'}`}
                                        onClick={() => toggleDropdown(s.id)}
                                    >
                                        <i className="bi bi-gear-fill me-2"></i>Acciones
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Panel de Acciones Deslizable para Estudiantes */}
            {openDropdownId && (
                <>
                    <div className="side-panel-overlay animate-fade-in" onClick={() => setOpenDropdownId(null)}></div>
                    <div className="side-panel bg-white shadow-2xl animate-slide-in-right p-0 overflow-hidden">
                        {(() => {
                            const student = students.find(s => s.id === openDropdownId);
                            if (!student) return null;
                            return (
                                <div className="h-100 d-flex flex-column">
                                    <div className="p-4 bg-primary text-white bg-gradient-primary position-relative overflow-hidden">
                                        <div className="position-absolute top-0 end-0 p-3 opacity-10" style={{ fontSize: '100px', transform: 'translate(20%, -20%)' }}>
                                            <i className="bi bi-person-badge"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="badge bg-white text-primary rounded-pill fw-bold small text-uppercase px-3">Expediente Escolar</span>
                                                <button className="btn btn-link text-white p-0 fs-4" onClick={() => setOpenDropdownId(null)}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center mb-1">
                                                <div className="bg-white text-primary rounded-circle p-2 me-3 fw-bold fs-4 d-flex align-items-center justify-content-center shadow-lg" style={{ width: '60px', height: '60px' }}>
                                                    {student.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <h5 className="fw-bold mb-0">{student.nombre}</h5>
                                                    <p className="smaller mb-0 opacity-75">{student.id} | {student.correo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 flex-grow-1 overflow-auto">
                                        <div className="row g-3 mb-4 text-center">
                                            <div className="col-6">
                                                <div className="p-3 rounded-4 bg-light border">
                                                    <div className="smaller text-muted fw-bold mb-1">GRADO</div>
                                                    <div className="fw-bold text-dark">{student.grado}</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 rounded-4 bg-light border">
                                                    <div className="smaller text-muted fw-bold mb-1">ESTADO</div>
                                                    <div className={`fw-bold text-${student.estado === 'Matriculado' ? 'success' : 'info'}`}>{student.estado}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-primary mb-3 text-uppercase smaller tracking-wider"><i className="bi bi-lightning-charge-fill me-2"></i>Acciones Rápidas</h6>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-primary transition-base" onClick={() => handleView(student)}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-person-lines-fill text-primary fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Ver Ficha Completa</div>
                                                        <div className="smaller text-muted">Datos de padres y contactos</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-info transition-base" onClick={() => handleEdit(student)}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-info bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-pencil-square text-info fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Editar Alumno</div>
                                                        <div className="smaller text-muted">Corregir nombre o grado</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <div className="border-top my-3"></div>
                                            <button className="btn btn-link text-danger text-start p-2 smaller text-decoration-none hover-bg-danger rounded-3" onClick={() => handleDelete(student.id)}>
                                                <i className="bi bi-trash-fill me-2"></i>Desvincular Alumno Permanentemente
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-light border-top text-center mt-auto">
                                        <p className="smaller text-muted mb-0">Sistema de Gestión de Alumnos v2.4 <br/> Escuela Innovadora © 2024</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </>
            )}

            {/* Modal para agregar alumno */}
            {showAddModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1060 }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border overflow-hidden" style={{ maxWidth: '400px', width: '95%' }}>
                        <div className="p-4 border-bottom bg-light">
                            <h5 className="fw-bold mb-0">Registrar Nuevo Estudiante</h5>
                        </div>
                        <form onSubmit={handleAddStudent} className="p-4">
                            <div className="mb-3">
                                <label className="form-label smaller fw-bold text-secondary">NOMBRE COMPLETO</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm rounded-pill px-3 border-2" 
                                    required 
                                    value={newStudent.nombre}
                                    onChange={(e) => setNewStudent({...newStudent, nombre: e.target.value})}
                                    placeholder="Ej. Carlos Mendoza"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label smaller fw-bold text-secondary">CORREO ELECTRÓNICO</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-sm rounded-pill px-3 border-2" 
                                    required 
                                    value={newStudent.correo}
                                    onChange={(e) => setNewStudent({...newStudent, correo: e.target.value})}
                                    placeholder="c.mendoza@ejemplo.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label smaller fw-bold text-secondary">GRADO ACADÉMICO</label>
                                <select 
                                    className="form-select form-select-sm rounded-pill px-3 border-2 fw-bold"
                                    value={newStudent.grado}
                                    onChange={(e) => setNewStudent({...newStudent, grado: e.target.value})}
                                >
                                    <option>1ro Sec</option>
                                    <option>2do Sec</option>
                                    <option>3ro Sec</option>
                                    <option>4to Sec</option>
                                    <option>5to Sec</option>
                                </select>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-sm btn-light rounded-pill flex-grow-1 fw-bold" onClick={() => setShowAddModal(false)}>CANCELAR</button>
                                <button type="submit" className="btn btn-sm btn-primary rounded-pill flex-grow-1 fw-bold shadow-sm">REGISTRAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <NotificationModal 
                show={modal.show}
                onClose={() => setModal({ ...modal, show: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                confirmText={modal.confirmText}
                onConfirm={modal.onConfirm}
            />
            
            <style jsx>{`
                .scale-up { transform: scale(1.05); }
                .bg-gradient-primary { background: linear-gradient(135deg, #1e3a8a, #3b82f6); }
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
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
                .tracking-wider { letter-spacing: 0.05em; }
                .hover-primary:hover { border-color: #3b82f6 !important; background-color: #eff6ff !important; }
                .hover-info:hover { border-color: #06b6d4 !important; background-color: #ecfeff !important; }
                .hover-bg-danger:hover { background-color: #fef2f2 !important; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                .transition-base { transition: all 0.2s ease; }
            `}</style>
        </div>
    );
};

export default StudentRoster;
