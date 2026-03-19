import React, { useState, useEffect } from 'react';
import NotificationModal from '../components/NotificationModal';

const PaymentsPage = () => {
    const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info' });
    
    // Base de datos de alumnos (Cuentas Corrientes)
    const [studentsAccount, setStudentsAccount] = useState([
        { id: '2024-001', nombre: 'Juan Perez', matricula: true, pensionesPagadas: 2 },
        { id: '2024-002', nombre: 'Maria Lopez', matricula: false, pensionesPagadas: 0 },
        { id: '2024-003', nombre: 'Carlos Ruiz', matricula: true, pensionesPagadas: 1 },
        { id: '2024-004', nombre: 'Ana Belen', matricula: true, pensionesPagadas: 3 },
        { id: '2024-005', nombre: 'Luis Garcia', matricula: false, pensionesPagadas: 0 },
    ]);

    // Historial de pagos localizados
    const [payments, setPayments] = useState([
        { id: 'REC-003', estudiante: 'Ana Belen', monto: 'S/ 450.00', fecha: '2024-03-18', estado: 'Pagado', concepto: 'Pensión Marzo', metodo: 'Yape' },
        { id: 'REC-002', estudiante: 'Juan Perez', monto: 'S/ 450.00', fecha: '2024-03-15', estado: 'Pagado', concepto: 'Pensión Marzo', metodo: 'Transferencia' },
        { id: 'REC-001', estudiante: 'Carlos Ruiz', monto: 'S/ 300.00', fecha: '2024-03-12', estado: 'Pagado', concepto: 'Matrícula', metodo: 'Efectivo' },
    ]);

    const [showPayModal, setShowPayModal] = useState(false);
    const [newPayment, setNewPayment] = useState({ studentId: '', concepto: 'Pensión', metodo: 'Efectivo' });
    const [errorMsg, setErrorMsg] = useState('');

    // Precios oficiales
    const getAmount = (concepto) => concepto === 'Matrícula' ? 300 : 450;

    // Procesar nuevo pago
    const handleAddPayment = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!newPayment.studentId) {
            setErrorMsg('Debe seleccionar un estudiante de la lista.');
            return;
        }

        const student = studentsAccount.find(s => s.id === newPayment.studentId);
        
        // RESTRICCIÓN LÓGICA SOLICITADA: Matrícula primero
        if (newPayment.concepto === 'Pensión' && !student.matricula) {
            setErrorMsg(`BLOQUEADO: El alumno ${student.nombre} NO ha pagado la Matrícula. Primero debe registrar el pago de Matrícula (S/ 300) para poder procesar la pensión.`);
            return;
        }

        // Evitar duplicar matrícula
        if (newPayment.concepto === 'Matrícula' && student.matricula) {
            setErrorMsg(`AVISO: El alumno ${student.nombre} ya tiene su Matrícula registrada y pagada.`);
            return;
        }

        const id = `REC-0${payments.length + 1}`;
        const monto = getAmount(newPayment.concepto);
        
        const paymentToAdd = {
            id,
            estudiante: student.nombre,
            monto: `S/ ${monto.toFixed(2)}`,
            concepto: newPayment.concepto === 'Matrícula' ? 'Matrícula' : `Pensión Mes #${student.pensionesPagadas + 1}`,
            fecha: new Date().toISOString().split('T')[0],
            estado: 'Pagado',
            metodo: newPayment.metodo
        };

        // Actualizar el estado de cuenta del alumno
        const updatedAccounts = studentsAccount.map(s => {
            if (s.id === student.id) {
                return {
                    ...s,
                    matricula: newPayment.concepto === 'Matrícula' ? true : s.matricula,
                    pensionesPagadas: newPayment.concepto === 'Pensión' ? s.pensionesPagadas + 1 : s.pensionesPagadas
                };
            }
            return s;
        });

        setStudentsAccount(updatedAccounts);
        setPayments([paymentToAdd, ...payments]);
        setShowPayModal(false);
        setNewPayment({ studentId: '', concepto: 'Pensión', metodo: 'Efectivo' });
        
        setModal({
            show: true,
            title: 'Transacción Exitosa',
            message: `¡Excelente! Se ha generado el recibo ${id} por el concepto de ${paymentToAdd.concepto} para ${student.nombre}.`,
            type: 'success'
        });
    };

    return (
        <div className="py-2">
            <header className="mb-4 d-flex justify-content-between align-items-end flex-wrap gap-3">
                <div>
                    <h1 className="display-6 fw-bold gradient-text mb-1 text-primary">Gestión de Caja y Tesorería</h1>
                    <p className="text-secondary mb-0 small">Administración de conceptos económicos: Matrícula (S/ 300) y Pensiones (S/ 450).</p>
                </div>
                <div className="text-end">
                    <button className="btn btn-primary rounded-pill px-4 shadow-lg fw-bold border-0 bg-gradient-primary" onClick={() => setShowPayModal(true)}>
                        <i className="bi bi-cash-coin me-2"></i>REGISTRAR NUEVO PAGO
                    </button>
                </div>
            </header>

            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="modern-card card p-3 shadow-sm border-0 border-top border-4 border-primary">
                        <h6 className="smaller fw-bold text-uppercase text-muted mb-2">Meta Proyectada</h6>
                        <h3 className="fw-bold mb-0 text-dark">S/ 65,000</h3>
                        <div className="progress mt-2" style={{ height: '5px' }}>
                            <div className="progress-bar bg-primary shadow-sm" style={{ width: '74%' }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="modern-card card p-3 shadow-sm border-0 border-top border-4 border-success">
                        <h6 className="smaller fw-bold text-uppercase text-muted mb-2">Total Recaudado</h6>
                        <h3 className="fw-bold mb-0 text-success">S/ 48,250</h3>
                        <div className="smaller text-muted mt-2">vía Banco y Caja</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="modern-card card p-3 shadow-sm border-0 border-top border-4 border-danger">
                        <h6 className="smaller fw-bold text-uppercase text-muted mb-2">Saldo Pendiente</h6>
                        <h3 className="fw-bold mb-0 text-danger">S/ 16,750</h3>
                        <div className="smaller text-muted mt-2">Cuentas por cobrar</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="modern-card card p-3 shadow-sm border-0 border-top border-4 border-warning">
                        <h6 className="smaller fw-bold text-uppercase text-muted mb-2">Pendientes Matrícula</h6>
                        <h3 className="fw-bold mb-0 text-warning">{studentsAccount.filter(s => !s.matricula).length} Alumnos</h3>
                        <div className="smaller text-muted mt-2">Sin regularizar vacante</div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="modern-card card p-4 shadow-sm border-0 h-100 rounded-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold mb-0 text-primary"><i className="bi bi-clock-history me-2"></i>Historial Reciente de Pagos</h6>
                            <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 border-light shadow-sm" onClick={() => window.print()}>
                                <i className="bi bi-file-earmark-pdf me-1"></i>Generar Reporte PDF
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-modern align-middle">
                                <thead>
                                    <tr className="smaller text-secondary text-uppercase border-bottom">
                                        <th>ID / Fecha</th>
                                        <th>Estudiante</th>
                                        <th>Concepto</th>
                                        <th>Monto</th>
                                        <th>Método</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map(p => (
                                        <tr key={p.id} className="animate-fade-in border-bottom-0">
                                            <td className="small">
                                                <div className="fw-bold text-primary">{p.id}</div>
                                                <div className="smaller text-muted">{p.fecha}</div>
                                            </td>
                                            <td className="fw-bold text-dark">{p.estudiante}</td>
                                            <td><span className="badge bg-light text-dark border-0 shadow-sm px-2 py-1">{p.concepto}</span></td>
                                            <td className="fw-bold text-dark">{p.monto}</td>
                                            <td className="small text-secondary">{p.metodo}</td>
                                            <td>
                                                <span className="badge rounded-pill px-3 py-2 bg-success-subtle text-success border border-success border-opacity-25">
                                                    <i className="bi bi-check-circle-fill me-1"></i>{p.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="modern-card card p-4 shadow-sm border-0 h-100 bg-light-subtle rounded-4">
                        <h6 className="fw-bold mb-4 text-primary"><i className="bi bi-person-check me-2"></i>Estado Académico-Financiero</h6>
                        <div className="list-group list-group-flush rounded-4 overflow-hidden border shadow-sm bg-white">
                            {studentsAccount.map(s => (
                                <div key={s.id} className="list-group-item d-flex justify-content-between align-items-center py-3 border-bottom">
                                    <div>
                                        <div className="fw-bold small">{s.nombre}</div>
                                        <div className="smaller text-muted">Código: {s.id}</div>
                                    </div>
                                    <div className="text-end">
                                        <div className={`badge rounded-pill mb-1 ${s.matricula ? 'bg-success' : 'bg-danger'} opacity-75`} style={{fontSize: '0.65rem'}}>
                                            {s.matricula ? 'Matrícula OK' : 'Matrícula Pendiente'}
                                        </div>
                                        <div className="smaller text-secondary">Pensiones: {s.pensionesPagadas} mes(es)</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Registrar Pago Modal (Popup mejorado) */}
            {showPayModal && (
                <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 1060, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)' }}>
                    <div className="bg-white rounded-5 shadow-lg p-0 border-0 overflow-hidden animate-slide-up" style={{ maxWidth: '500px', width: '95%' }}>
                        <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center bg-gradient-primary">
                            <h5 className="fw-bold mb-0"><i className="bi bi-cash-stack me-2"></i>Módulo de Cobranza Directa</h5>
                            <button className="btn-close btn-close-white" onClick={() => { setShowPayModal(false); setErrorMsg(''); }}></button>
                        </div>
                        <form onSubmit={handleAddPayment} className="p-4">
                            {errorMsg && (
                                <div className="alert alert-danger border-0 shadow-sm rounded-4 small py-2 mb-3 d-flex align-items-center">
                                    <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                                    <div>{errorMsg}</div>
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">ALUMNO A FACTURAR</label>
                                <select 
                                    className="form-select rounded-pill px-3 border-light shadow-sm bg-light"
                                    required
                                    value={newPayment.studentId}
                                    onChange={(e) => {
                                        setNewPayment({...newPayment, studentId: e.target.value});
                                        setErrorMsg('');
                                    }}
                                >
                                    <option value="">-- Buscar por nombre --</option>
                                    {studentsAccount.map(s => (
                                        <option key={s.id} value={s.id}>{s.nombre} ({s.matricula ? 'M. Pagada' : 'M. Pendiente'})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">CONCEPTO</label>
                                    <select 
                                        className="form-select rounded-pill px-3 border-light shadow-sm bg-light"
                                        value={newPayment.concepto}
                                        onChange={(e) => setNewPayment({...newPayment, concepto: e.target.value})}
                                    >
                                        <option value="Matrícula">Matrícula (S/ 300)</option>
                                        <option value="Pensión">Pensión (S/ 450)</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-secondary">MÉTODO DE PAGO</label>
                                    <select 
                                        className="form-select rounded-pill px-3 border-light shadow-sm bg-light"
                                        value={newPayment.metodo}
                                        onChange={(e) => setNewPayment({...newPayment, metodo: e.target.value})}
                                    >
                                        <option>Efectivo (Caja)</option>
                                        <option>Transferencia BBVA</option>
                                        <option>Yape / Plin</option>
                                        <option>Tarjeta Crédito/Débito</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-light rounded-4 p-3 mb-4 text-center border shadow-inner">
                                <div className="smaller text-muted text-uppercase fw-bold mb-1">Total Neto a Cobrar</div>
                                <div className="display-6 fw-bold text-primary">S/ {getAmount(newPayment.concepto).toFixed(2)}</div>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary rounded-pill py-3 fw-bold shadow-lg border-0 bg-gradient-primary">
                                    <i className="bi bi-check-circle-fill me-2"></i>CONFIRMAR Y EMITIR RECIBO
                                </button>
                                <button type="button" className="btn btn-light rounded-pill py-2 text-secondary fw-bold" onClick={() => { setShowPayModal(false); setErrorMsg(''); }}>CANCELAR OPERACIÓN</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style jsx>{`
                .bg-gradient-primary {
                    background: linear-gradient(45deg, #1a237e, #311b92);
                }
                .bg-gradient-primary:hover {
                    background: linear-gradient(45deg, #311b92, #1a237e);
                    transform: translateY(-2px);
                    transition: all 0.3s;
                }
                .shadow-inner {
                    box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
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

export default PaymentsPage;
