import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = {
        director: [
            { label: 'Inicio', icon: 'bi-grid-1x2', path: '/director-dashboard' },
            { label: 'Matrículas', icon: 'bi-person-check', path: '/matriculas' },
            { label: 'Gestión de Maestros', icon: 'bi-mortarboard', path: '/maestros' },
            { label: 'Cursos 2024', icon: 'bi-book', path: '/cursos' },
            { label: 'Incidencias', icon: 'bi-exclamation-triangle', path: '/incidencias' },
        ],
        secretaria: [
            { label: 'Inicio', icon: 'bi-house', path: '/secretaria-dashboard' },
            { label: 'Matrículas 2024', icon: 'bi-person-plus', path: '/matriculas' },
            { label: 'Emisión de Diplomas', icon: 'bi-patch-check', path: '/diplomas' },
            { label: 'Pagos y Pensiones', icon: 'bi-cash-coin', path: '/pagos' },
        ],
        professor: [
            { label: 'Inicio', icon: 'bi-grid-1x2', path: '/professor-dashboard' },
            { label: 'Mis Cursos', icon: 'bi-book', path: '/cursos' },
            { label: 'Registro de Notas', icon: 'bi-pencil-square', path: '/notas' },
            { label: 'Mi Horario', icon: 'bi-calendar3', path: '/horario' },
        ],
        auxiliar: [
            { label: 'Inicio', icon: 'bi-house', path: '/auxiliar-dashboard' },
            { label: 'Incidencias', icon: 'bi-exclamation-triangle', path: '/incidencias' },
            { label: 'Protocolos de Seguridad', icon: 'bi-shield-check', path: '#' },
        ]
    };

    const currentMenu = menuItems[user?.role] || [];

    return (
        <>
            <div className={`mobile-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
            <aside className={`sidebar shadow-lg ${isOpen ? 'active' : ''}`}>
                <div className="p-4 text-center border-bottom border-secondary border-opacity-25 mb-4">
                    <div className="bg-white d-inline-block p-2 rounded-circle mb-2 overflow-hidden shadow-sm" style={{ width: '60px', height: '60px' }}>
                         <span className="fs-2">🏫</span>
                    </div>
                    <h6 className="fw-bold mb-0 text-white opacity-75">Escuela Innovadora</h6>
                </div>

                <div className="nav flex-column flex-nowrap overflow-auto" style={{ height: 'calc(100vh - 200px)' }}>
                    {currentMenu.map((item, idx) => (
                        <NavLink 
                            key={idx} 
                            to={item.path} 
                            className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
                            onClick={window.innerWidth < 992 ? toggleSidebar : undefined}
                        >
                            <i className={`bi ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="mt-auto p-4 border-top border-secondary border-opacity-25">
                    <div className="d-flex align-items-center mb-3">
                        <div className="bg-accent rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <span className="text-white fw-bold">{user?.name?.charAt(0)}</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="small fw-bold text-white mb-0 text-truncate">{user?.name}</p>
                            <p className="text-white-50 mb-0" style={{ fontSize: '0.7rem' }}>{user?.role?.toUpperCase()}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm w-100 rounded-pill py-2">
                        <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
