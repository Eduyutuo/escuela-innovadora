import React from 'react';

const CourseList = () => {
    const courses = [
        { id: 1, name: 'Matemáticas Avanzadas', grade: '5to B', students: 32, attendance: '88%', status: 'active', color: 'primary' },
        { id: 2, name: 'Física II', grade: '4to A', students: 28, attendance: '65%', status: 'warning', color: 'warning' },
        { id: 3, name: 'Literatura Universal', grade: '3to C', students: 25, attendance: '92%', status: 'active', color: 'success' },
        { id: 4, name: 'Inglés IV', grade: '5to A', students: 30, attendance: '95%', status: 'active', color: 'info' },
    ];

    return (
        <div className="modern-card card p-4 shadow-sm border-0 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Cursos y Secciones 2024</h5>
                <button className="btn btn-sm btn-light rounded-pill">Ver todos</button>
            </div>

            <div className="row g-3">
                {courses.map(course => (
                    <div className="col-12" key={course.id}>
                        <div className="p-3 bg-light rounded-4 hover-bg-light transition-base cursor-pointer border-start border-4 border-primary shadow-hover border-opacity-75">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fw-bold mb-1">{course.name}</h6>
                                    <div className="d-flex gap-2">
                                        <span className="small text-muted"><i className="bi bi-people me-1"></i>{course.students} Alumnos</span>
                                        <span className="small text-muted"><i className="bi bi-geo-alt me-1"></i>{course.grade}</span>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div className={`badge-soft badge rounded-pill bg-${course.color}-subtle text-${course.color} mb-1`}>
                                        {course.attendance} Asist.
                                    </div>
                                    <div className="small text-muted fw-bold" style={{ fontSize: '0.6rem' }}>ACTUALIZADO</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
