import React from 'react';

const NotificationModal = ({ show, onClose, title, message, type = 'info', onConfirm, confirmText = 'Aceptar' }) => {
    if (!show) return null;

    const icons = {
        info: 'bi-info-circle text-primary',
        success: 'bi-check-circle text-success',
        warning: 'bi-exclamation-triangle text-warning',
        danger: 'bi-x-circle text-danger',
        question: 'bi-question-circle text-info'
    };

    const colors = {
        info: 'primary',
        success: 'success',
        warning: 'warning',
        danger: 'danger',
        question: 'info'
    };

    return (
        <div className="modal-overlay d-flex align-items-center justify-content-center animate-fade-in" style={{ zIndex: 2000 }}>
            <div className="bg-white rounded-5 shadow-lg p-0 border-0 overflow-hidden animate-zoom-in" style={{ maxWidth: '450px', width: '90%' }}>
                <div className={`p-4 text-center border-bottom border-light bg-${colors[type]}-subtle bg-opacity-10`}>
                    <i className={`bi ${icons[type]} display-4 mb-2 d-block`}></i>
                    <h5 className="fw-bold mb-0 text-dark">{title}</h5>
                </div>
                <div className="p-4">
                    <p className="text-secondary text-center mb-0" style={{ whiteSpace: 'pre-line' }}>{message}</p>
                </div>
                <div className="p-3 bg-light d-flex gap-2">
                    {onConfirm && (
                        <button className="btn btn-light rounded-pill flex-grow-1 fw-bold" onClick={onClose}>
                            CANCELAR
                        </button>
                    )}
                    <button 
                        className={`btn btn-${colors[type]} rounded-pill flex-grow-1 fw-bold shadow-sm`} 
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
