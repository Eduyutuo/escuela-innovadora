import React, { useState } from 'react';
import NotificationModal from './NotificationModal';

const TeacherRoster = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info', onConfirm: null });
    
    // Datos de docentes localizados con cursos asignados
    const [teachers, setTeachers] = useState([
        { id: 'PROF-001', nombre: 'Dr. Roberto Santos', especialidad: 'Matemáticas', correo: 'r.santos@escuela.edu.pe', estado: 'Activo', cursos: ['Matemáticas 5to B'] },
        { id: 'PROF-002', nombre: 'Mg. Lucía Mendez', especialidad: 'Literatura', correo: 'l.mendez@escuela.edu.pe', estado: 'Activo', cursos: ['Literatura 4to A'] },
        { id: 'PROF-003', nombre: 'Ing. Marco Polo', especialidad: 'Física', correo: 'm.polo@escuela.edu.pe', estado: 'Licencia', cursos: [] },
    ]);

    const [newTeacher, setNewTeacher] = useState({ nombre: '', especialidad: 'Matemáticas', correo: '' });
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [courseModal, setCourseModal] = useState({ show: false, teacherId: null });

    const availableCourses = ['Matemáticas 5to B', 'Álgebra 4to A', 'Geometría 3ro C', 'Literatura 2do B', 'Historia 1ro A', 'Física 5to A'];

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Asignar curso a docente
    const handleAssignCourse = (course) => {
        setTeachers(prev => prev.map(t => {
            if (t.id === courseModal.teacherId) {
                // Evitar duplicados
                if (t.cursos.includes(course)) return t;
                return { ...t, cursos: [...t.cursos, course] };
            }
            return t;
        }));
        setModal({
            show: true,
            title: 'Curso Asignado',
            message: `La materia "${course}" ha sido asignada exitosamente.`,
            type: 'success'
        });
        setCourseModal({ show: false, teacherId: null });
    };

    // Eliminar curso asignado
    const removeCourse = (teacherId, course) => {
        setTeachers(prev => prev.map(t => 
            t.id === teacherId ? { ...t, cursos: t.cursos.filter(c => c !== course) } : t
        ));
    };

    // Agregar nuevo docente
    const handleAddTeacher = (e) => {
        e.preventDefault();
        const id = `PROF-0${teachers.length + 1}`;
        const teacherToAdd = {
            ...newTeacher,
            id,
            estado: 'Activo',
            cursos: []
        };
        setTeachers([...teachers, teacherToAdd]);
        setNewTeacher({ nombre: '', especialidad: 'Matemáticas', correo: '' });
        setShowAddModal(false);
        setModal({
            show: true,
            title: 'Docente Registrado',
            message: `El profesor ${teacherToAdd.nombre} ha sido añadido al sistema correctamente.`,
            type: 'success'
        });
    };

    // Dar de baja a un docente
    const handleDelete = (id) => {
        setModal({
            show: true,
            title: 'Dar de Baja',
            message: '¿Está seguro de que desea dar de baja a este docente? Se mantendrá el registro histórico pero no podrá ser asignado a nuevos cursos.',
            type: 'danger',
            confirmText: 'CONFIRMAR BAJA',
            onConfirm: () => {
                setTeachers(teachers.filter(t => t.id !== id));
                setOpenDropdownId(null);
                setModal({ show: false });
            }
        });
    };

    // Editar datos básicos
    const handleEdit = (teacher) => {
        const newName = window.prompt('Editar nombre del docente:', teacher.nombre);
        if (newName) {
            setTeachers(teachers.map(t => t.id === teacher.id ? { ...teacher, nombre: newName } : t));
            setModal({
                show: true,
                title: 'Actualización Exitosa',
                message: `Los datos del docente ${newName} han sido actualizados.`,
                type: 'success'
            });
        }
        setOpenDropdownId(null);
    };

    return (
        <div className="modern-card card p-4 shadow-sm border-0 position-relative rounded-5">
            {/* Overlay para facilitar el cierre del menú */}
            {openDropdownId && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100" 
                    style={{ zIndex: 1040, background: 'rgba(0,0,0,0.01)', cursor: 'default' }} 
                    onClick={() => setOpenDropdownId(null)}
                ></div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h5 className="fw-bold mb-0 text-primary"><i className="bi bi-mortarboard-fill me-2"></i>Gestión de Docentes</h5>
                <div className="d-flex gap-2 align-items-center">
                    <button className="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold border-2 shadow-sm" onClick={() => alert('Generando reporte de plantilla docente 2024...')}>
                        <i className="bi bi-file-earmark-spreadsheet me-2"></i>EXPORTAR DOCENTES
                    </button>
                    <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold ms-lg-2" onClick={() => setShowAddModal(true)}>
                        <i className="bi bi-person-plus-fill me-2"></i>NUEVO MAESTRO
                    </button>
                </div>
            </div>

            <div className="table-responsive" style={{ minHeight: '350px' }}>
                <table className="table table-hover table-modern align-middle">
                    <thead>
                        <tr className="smaller text-secondary text-uppercase border-bottom">
                            <th className="ps-3">Profesor / Materias Asignadas</th>
                            <th>Especialidad</th>
                            <th className="text-center">Estado</th>
                            <th className="text-end pe-4">Acciones de Gestión</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(t => (
                            <tr key={t.id} className="animate-fade-in border-bottom-0">
                                <td className="ps-3">
                                    <div className="d-flex align-items-start py-2">
                                        <div className="bg-primary bg-opacity-10 text-primary rounded-pill p-2 me-3 small fw-bold d-flex align-items-center justify-content-center mt-1" style={{ width: '40px', height: '40px', border: '2px solid rgba(13, 110, 253, 0.2)' }}>
                                            {t.nombre.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="fw-bold text-dark">{t.nombre}</div>
                                            <div className="smaller text-muted font-monospace mb-2">{t.id} | {t.correo}</div>
                                            <div className="d-flex flex-wrap gap-1">
                                                {t.cursos.length > 0 ? t.cursos.map(c => (
                                                    <span key={c} className="badge bg-primary-subtle text-primary smaller border border-primary border-opacity-25 rounded-pill d-flex align-items-center ps-2 pe-1">
                                                        {c}
                                                        <button className="btn btn-link btn-sm text-primary p-0 ms-1 opacity-50 hover-opacity-100" onClick={() => removeCourse(t.id, c)}>
                                                            <i className="bi bi-x"></i>
                                                        </button>
                                                    </span>
                                                )) : <span className="text-muted smaller opacity-50 italic">Sin cursos asignados</span>}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge bg-light text-dark border shadow-sm px-3 py-2 rounded-pill fw-medium">{t.especialidad}</span></td>
                                <td className="text-center">
                                    <span className={`badge rounded-pill px-3 py-2 bg-${t.estado === 'Activo' ? 'success' : 'warning'}-subtle text-${t.estado === 'Activo' ? 'success' : 'warning'} border border-${t.estado === 'Activo' ? 'success' : 'warning'} border-opacity-25`}>
                                        <i className={`bi bi-${t.estado === 'Activo' ? 'check-circle' : 'exclamation-triangle'} me-1`}></i> {t.estado}
                                    </span>
                                </td>
                                <td className="text-end pe-3">
                                    <button 
                                        className={`btn btn-sm rounded-pill px-4 border-2 shadow-sm transition-all fw-bold ${openDropdownId === t.id ? 'btn-primary border-primary text-white' : 'btn-outline-primary'}`}
                                        onClick={() => toggleDropdown(t.id)}
                                    >
                                        <i className="bi bi-gear-fill me-2"></i>Gestión
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Slide-over Action Panel for Teachers */}
            {openDropdownId && (
                <>
                    <div className="side-panel-overlay animate-fade-in" onClick={() => setOpenDropdownId(null)}></div>
                    <div className="side-panel bg-white shadow-2xl animate-slide-in-right p-0 overflow-hidden">
                        {(() => {
                            const teacher = teachers.find(t => t.id === openDropdownId);
                            if (!teacher) return null;
                            return (
                                <div className="h-100 d-flex flex-column">
                                    <div className="p-4 bg-primary text-white bg-gradient-primary position-relative overflow-hidden">
                                        <div className="position-absolute top-0 end-0 p-3 opacity-10" style={{ fontSize: '100px', transform: 'translate(20%, -20%)' }}>
                                            <i className="bi bi-mortarboard"></i>
                                        </div>
                                        <div className="position-relative z-1">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="badge bg-white text-primary rounded-pill fw-bold small text-uppercase px-3">Ficha Docente</span>
                                                <button className="btn btn-link text-white p-0 fs-4" onClick={() => setOpenDropdownId(null)}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <div className="d-flex align-items-center mb-1">
                                                <div className="bg-white text-primary rounded-circle p-2 me-3 fw-bold fs-4 d-flex align-items-center justify-content-center shadow-lg" style={{ width: '60px', height: '60px' }}>
                                                    {teacher.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <h5 className="fw-bold mb-0">{teacher.nombre}</h5>
                                                    <p className="smaller mb-0 opacity-75">{teacher.id} | {teacher.correo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 flex-grow-1 overflow-auto">
                                        <div className="row g-3 mb-4 text-center">
                                            <div className="col-12">
                                                <div className="p-3 rounded-4 bg-light border">
                                                    <div className="smaller text-muted fw-bold mb-1">ESPECIALIDAD</div>
                                                    <div className="fw-bold text-dark">{teacher.especialidad}</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 rounded-4 bg-light border">
                                                    <div className="smaller text-muted fw-bold mb-1">ESTADO</div>
                                                    <div className={`fw-bold text-${teacher.estado === 'Activo' ? 'success' : 'warning'}`}>{teacher.estado}</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 rounded-4 bg-light border">
                                                    <div className="smaller text-muted fw-bold mb-1">MATERIAS</div>
                                                    <div className="fw-bold text-dark">{teacher.cursos.length}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <h6 className="fw-bold text-primary mb-3 text-uppercase smaller tracking-wider"><i className="bi bi-lightning-charge-fill me-2"></i>Gestión Académica</h6>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-primary transition-base" onClick={() => {
                                                setCourseModal({ show: true, teacherId: teacher.id });
                                                setOpenDropdownId(null);
                                            }}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-journal-plus text-primary fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Asignar Nueva Materia</div>
                                                        <div className="smaller text-muted">Vincular curso o grado</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-info transition-base" onClick={() => setModal({
                                                show: true,
                                                title: `Horario del Docente: ${teacher.nombre}`,
                                                message: `Lunes: 8:00 - 10:00 (Matemática 5to B)\nMartes: 10:30 - 12:30 (Álgebra 4to A)\nMiércoles: Libre\nJueves: 08:00 - 10:00 (Geometría 3ro C)`,
                                                type: 'info'
                                            })}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-info bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-calendar3 text-info fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Ver Horario Semanal</div>
                                                        <div className="smaller text-muted">Carga lectiva actual</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <button className="btn btn-white border-2 text-start p-3 rounded-4 shadow-sm hover-secondary transition-base" onClick={() => handleEdit(teacher)}>
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-secondary bg-opacity-10 p-2 rounded-circle me-3"><i className="bi bi-pencil-square text-secondary fs-5"></i></div>
                                                    <div>
                                                        <div className="fw-bold text-dark small">Editar Información</div>
                                                        <div className="smaller text-muted">Actualizar datos de contacto</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <div className="border-top my-3"></div>
                                            <button className="btn btn-link text-danger text-start p-2 smaller text-decoration-none hover-bg-danger rounded-3" onClick={() => handleDelete(teacher.id)}>
                                                <i className="bi bi-person-x-fill me-2"></i>Dar de Baja al Docente
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-light border-top text-center mt-auto">
                                        <p className="smaller text-muted mb-0">Portal de Gestión Docente v2.4 <br/> Escuela Innovadora © 2024</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </>
            )}

            {/* Modal para asignar curso */}
            {courseModal.show && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1070 }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border-0 overflow-hidden animate-slide-up" style={{ maxWidth: '450px', width: '95%' }}>
                        <div className="p-4 bg-primary text-white bg-gradient-primary">
                            <h5 className="fw-bold mb-0"><i className="bi bi-journal-plus me-2"></i>Asignar Materia a Docente</h5>
                        </div>
                        <div className="p-4">
                            <p className="smaller text-secondary mb-4">Seleccione la materia y grado que desea asignar al profesor <strong>{teachers.find(t => t.id === courseModal.teacherId)?.nombre}</strong>.</p>
                            <div className="list-group rounded-4 mb-4 border-0 shadow-sm overflow-hidden">
                                {availableCourses.map(course => (
                                    <button 
                                        key={course} 
                                        className="list-group-item list-group-item-action border-0 py-3 d-flex justify-content-between align-items-center hover-bg-light transition-base"
                                        onClick={() => handleAssignCourse(course)}
                                    >
                                        <span className="fw-bold text-dark small">{course}</span>
                                        <i className="bi bi-plus-circle-fill text-primary fs-5"></i>
                                    </button>
                                ))}
                            </div>
                            <button className="btn btn-light rounded-pill w-100 fw-bold py-2" onClick={() => setCourseModal({ show: false, teacherId: null })}>CANCELAR</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para registrar maestro */}
            {showAddModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1060 }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border overflow-hidden" style={{ maxWidth: '400px', width: '95%' }}>
                        <div className="p-4 border-bottom bg-primary text-white bg-gradient-primary">
                            <h5 className="fw-bold mb-0">Registrar Nuevo Maestro</h5>
                        </div>
                        <form onSubmit={handleAddTeacher} className="p-4">
                            <div className="mb-3">
                                <label className="form-label smaller fw-bold text-secondary">NOMBRE COMPLETO</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-sm rounded-pill px-3 border-2" 
                                    required 
                                    value={newTeacher.nombre}
                                    onChange={(e) => setNewTeacher({...newTeacher, nombre: e.target.value})}
                                    placeholder="Ej. Roberto Santos"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label smaller fw-bold text-secondary">CORREO INSTITUCIONAL</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-sm rounded-pill px-3 border-2" 
                                    required 
                                    value={newTeacher.correo}
                                    onChange={(e) => setNewTeacher({...newTeacher, correo: e.target.value})}
                                    placeholder="r.santos@escuela.edu.pe"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label smaller fw-bold text-secondary">ESPECIALIDAD / ÁREA</label>
                                <select 
                                    className="form-select form-select-sm rounded-pill px-3 border-2 fw-bold"
                                    value={newTeacher.especialidad}
                                    onChange={(e) => setNewTeacher({...newTeacher, especialidad: e.target.value})}
                                >
                                    <option>Matemáticas</option>
                                    <option>Literatura</option>
                                    <option>Física</option>
                                    <option>Historia</option>
                                    <option>Inglés</option>
                                </select>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-sm btn-light rounded-pill flex-grow-1 fw-bold" onClick={() => setShowAddModal(false)}>CANCELAR</button>
                                <button type="submit" className="btn btn-sm btn-primary text-white rounded-pill flex-grow-1 fw-bold shadow-sm bg-gradient-primary border-0">REGISTRAR</button>
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
                .bg-gradient-primary { background: linear-gradient(135deg, #1a237e, #3f51b5); }
                .scale-up { transform: scale(1.05); }
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
                .tracking-wider { letter-spacing: 0.05em; }
                .hover-primary:hover { border-color: #3f51b5 !important; background-color: #e8eaf6 !important; }
                .hover-info:hover { border-color: #0d6efd !important; background-color: #ebf5ff !important; }
                .hover-bg-danger:hover { background-color: #fef2f2 !important; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                .transition-base { transition: all 0.2s ease; }
                .hover-opacity-100:hover { opacity: 1 !important; }
                .animate-slide-up { animation: slideUp 0.3s ease-out; }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default TeacherRoster;
