import React, { useState } from 'react';

const DiplomaModule = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [issuingStates, setIssuingStates] = useState({}); // Seguimiento individual de firma por ID

    // Base de datos de egresados con promedios reales
    const students = [
        { id: '2024-001', nombre: 'Juan Perez', grado: '5to Sec', promedio: 18.5, estado: 'Graduado' },
        { id: '2024-002', nombre: 'Maria Lopez', grado: '5to Sec', promedio: 19.2, estado: 'Graduado' },
        { id: '2024-003', nombre: 'Carlos Ruiz', grado: '5to Sec', promedio: 14.5, estado: 'Pendiente' },
        { id: '2024-004', nombre: 'Elena Torres', grado: '5to Sec', promedio: 17.8, estado: 'Graduado' },
    ];

    const filteredStudents = students.filter(s => 
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm)
    );

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleIssue = (student) => {
        // RESTRICCIÓN SOLICITADA: Solo promedios >= 18
        if (student.promedio < 18) {
            setErrorMessage(`DIPLOMA RECHAZADO: El alumno(a) ${student.nombre} cuenta con un promedio de ${student.promedio}. Según la normativa institucional, solo se emiten diplomas con notas de 18 a superior.`);
            setTimeout(() => setErrorMessage(''), 6000);
            return;
        }

        // Activamos firma digital SOLO para el ID del estudiante seleccionado
        setIssuingStates(prev => ({ ...prev, [student.id]: true }));
        
        setTimeout(() => {
            setSelectedStudent(student);
            setIssuingStates(prev => ({ ...prev, [student.id]: false }));
            setShowModal(true);
        }, 1500);
    };

    const downloadPDF = () => {
        const btn = document.getElementById('downloadBtn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>PROCESANDO PDF...';
        btn.disabled = true;

        setTimeout(() => {
            // Captura el contenido del frame para imprimir
            const printContent = document.getElementById('diploma-to-print').innerHTML;
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                alert('Por favor, permita las ventanas emergentes (pop-ups) para descargar el diploma.');
                btn.innerHTML = originalContent;
                btn.disabled = false;
                return;
            }
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Diploma Oficial - ${selectedStudent.nombre}</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
                        <style>
                            @page { size: landscape; margin: 0; }
                            body { background: #fffcf5; font-family: 'Times New Roman', serif; }
                            .diploma-print-frame { 
                                border: 20px double #c5a059 !important; 
                                padding: 80px; 
                                text-align: center; 
                                background: white;
                                margin: 20px;
                                min-height: 95vh;
                            }
                            .gradient-text { color: #1a237e; font-weight: bold; }
                        </style>
                    </head>
                    <body>
                        <div class="diploma-print-frame">
                            ${printContent}
                        </div>
                        <script>
                            window.onload = () => {
                                window.print();
                                setTimeout(() => window.close(), 500);
                            };
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();

            btn.innerHTML = '<i class="bi bi-filetype-pdf me-2"></i>DESCARGA EXITOSA';
            setTimeout(() => {
                setShowModal(false);
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 1000);
        }, 1500);
    };

    return (
        <div className="modern-card card p-4 h-100 shadow-sm border-0 position-relative rounded-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 text-primary">Certificación de Excelencia Académica</h5>
                <span className="badge bg-gold text-dark rounded-pill px-4 py-2 shadow-sm border border-warning border-opacity-50">
                    <i className="bi bi-award-fill me-2"></i>SISTEMA DE GRADOS
                </span>
            </div>

            {errorMessage && (
                <div className="alert alert-danger border-0 shadow-lg rounded-4 animate-fade-in mb-4 d-flex align-items-center py-3">
                    <div className="bg-danger text-white rounded-circle p-2 me-3 shadow-sm">
                        <i className="bi bi-x-lg"></i>
                    </div>
                    <div className="fw-bold small">{errorMessage}</div>
                    <button className="btn-close ms-auto" onClick={() => setErrorMessage('')}></button>
                </div>
            )}

            <div className="input-group mb-4 shadow-sm rounded-pill overflow-hidden border-2 border-primary border-opacity-10">
                <span className="input-group-text bg-white border-0 ps-4">
                    <i className="bi bi-search text-primary"></i>
                </span>
                <input 
                    type="text" 
                    className="form-control border-0 py-3 small fw-medium" 
                    placeholder="Escriba el nombre completo del egresado para validar..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-modern align-middle">
                    <thead className="text-secondary smaller text-uppercase">
                        <tr>
                            <th className="border-0">CÓDIGO SIAGIE</th>
                            <th className="border-0">ESTUDIANTE EGRESADO</th>
                            <th className="border-0 text-center">PROM. GENERAL</th>
                            <th className="border-0 text-end">ACCIÓN DE EMISIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} className="border-bottom-0">
                                <td className="small fw-bold text-muted">{student.id}</td>
                                <td>
                                    <div className="fw-bold text-dark">{student.nombre}</div>
                                    <div className="smaller text-secondary">{student.grado}</div>
                                </td>
                                <td className="text-center">
                                    <span className={`badge rounded-pill px-3 py-2 ${student.promedio >= 18 ? 'bg-success text-white' : 'bg-light text-muted border'}`} style={{fontSize: '0.85rem'}}>
                                        {student.promedio}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <button 
                                        className={`btn btn-sm rounded-pill px-4 fw-bold shadow-sm transition-base ${student.promedio >= 18 ? (issuingStates[student.id] ? 'btn-info text-white' : 'btn-primary bg-gradient-primary border-0') : 'btn-light text-muted'}`}
                                        onClick={() => handleIssue(student)}
                                        disabled={issuingStates[student.id]}
                                    >
                                        {issuingStates[student.id] ? (
                                            <><span className="spinner-border spinner-border-sm me-2"></span>FIRMANDO...</>
                                        ) : (
                                            <><i className="bi bi-patch-check me-2"></i>EMITIR DIPLOMA</>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Diploma Certificate Modal (Premium Visual) */}
            {showModal && selectedStudent && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                    <div className="bg-white rounded-5 shadow-2xl p-1 border-0 overflow-hidden animate-slide-up" style={{ maxWidth: '900px', width: '95%' }}>
                        <div id="diploma-to-print" className="diploma-frame p-5 text-center border-gold-double m-3 rounded-4 position-relative overflow-hidden" 
                             style={{ background: '#fffef9', minHeight: '600px' }}>
                            
                            <div className="watermark-escuela"></div>
                            
                            <div className="mb-4 mt-2">
                                <img src="https://via.placeholder.com/80?text=LOGO" alt="Logo" className="mb-3 rounded-circle border border-warning p-1" style={{width: '60px'}} />
                                <h1 className="fw-bold text-uppercase institution-title" style={{ letterSpacing: '6px' }}>Escuela Innovadora</h1>
                                <div className="gold-separator mx-auto"></div>
                                <p className="small text-muted mb-0 fw-bold mt-2">ALTA DIRECCIÓN ACADÉMICA</p>
                            </div>

                            <div className="my-5">
                                <p className="italic mb-3 fs-5" style={{fontFamily: 'Georgia, serif'}}>El Consejo Directivo otorga el presente:</p>
                                <h1 className="display-3 fw-bold mb-4 diploma-header">DIPLOMA DE HONOR</h1>
                                <p className="lead italic mb-1">A la distinción académica de:</p>
                                <h1 className="display-4 fw-bold mb-4 name-field">{selectedStudent.nombre}</h1>
                                <p className="px-5 text-dark fs-6" style={{lineHeight: '1.6'}}>Por su destacado desempeño académico y conductual en el grado de <strong>{selectedStudent.grado}</strong>, logrando un promedio sobresaliente de <strong>{selectedStudent.promedio}</strong>. En fe de lo cual, firmamos y sellamos la presente certificación.</p>
                            </div>

                            <div className="row mt-5 pt-4 position-relative z-2">
                                <div className="col-4 text-center">
                                    <div className="signature-line mx-4"></div>
                                    <div className="small fw-bold text-uppercase">Director General</div>
                                </div>
                                <div className="col-4 d-flex align-items-center justify-content-center">
                                    <div className="official-seal">
                                        <i className="bi bi-shield-check fs-2 text-warning"></i>
                                        <div className="seal-text">VALIDADO</div>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="signature-line mx-4"></div>
                                    <div className="small fw-bold text-uppercase">Secretaría Académica</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-light d-flex justify-content-between align-items-center rounded-bottom-5 border-top">
                            <span className="small text-muted"><i className="bi bi-lock-fill me-2"></i>Documento cifrado con firma digital SIAGIE 2.0</span>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light rounded-pill px-4 fw-bold text-secondary" onClick={() => setShowModal(false)}>VOLVER</button>
                                <button id="downloadBtn" className="btn btn-success rounded-pill px-5 shadow-lg fw-bold border-0 bg-success-gradient" onClick={downloadPDF}>
                                    <i className="bi bi-download me-2"></i>DESCARGAR DIPLOMA PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                .bg-gradient-primary { background: linear-gradient(45deg, #1a237e, #311b92); }
                .bg-success-gradient { background: linear-gradient(45deg, #1b5e20, #2e7d32); }
                .border-gold-double { border: 15px double #d4af37 !important; }
                .gold-separator { width: 100px; height: 3px; background: #d4af37; border-radius: 10px; }
                .diploma-header { color: #8e6d1c; letter-spacing: 2px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
                .name-field { color: #1a237e; border-bottom: 2px solid #eee; display: inline-block; padding-bottom: 5px; }
                .institution-title { color: #1a237e; font-size: 1.8rem; }
                .signature-line { border-top: 1px solid #333; margin-bottom: 5px; }
                .official-seal { 
                    width: 90px; height: 90px; border: 4px solid #d4af37; border-radius: 50%; 
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    background: white; transform: rotate(-15deg); box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                .seal-text { font-size: 0.6rem; font-weight: 900; color: #d4af37; }
                .watermark-escuela {
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    font-size: 15rem; color: rgba(0,0,0,0.02); z-index: 0; pointer-events: none;
                }
                .transition-base { transition: all 0.3s ease; }
                .bg-gold { background-color: #fdf6e3; color: #8e6d1c; }
            `}</style>
        </div>
    );
};

export default DiplomaModule;
