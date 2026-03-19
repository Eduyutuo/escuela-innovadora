import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
    const { login } = useUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const roles = [
        { role: 'director', label: 'Director', user: 'director1', pass: 'admin123', icon: '🎓', color: 'primary' },
        { role: 'secretaria', label: 'Secretaría', user: 'secretaria1', pass: 'admin123', icon: '📝', color: 'info' },
        { role: 'professor', label: 'Profesor', user: 'profesor1', pass: 'admin123', icon: '👨‍🏫', color: 'success' },
        { role: 'auxiliar', label: 'Auxiliar', user: 'auxiliar1', pass: 'admin123', icon: '🛠️', color: 'warning' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica simple de demostración
        const foundRole = roles.find(r => r.user === credentials.username);
        if (foundRole) {
            login({ id: Date.now(), role: foundRole.role, name: foundRole.label });
            navigate(`/${foundRole.role}-dashboard`);
        } else {
            alert('Credenciales inválidas para la demo. Use las de la tabla inferior.');
        }
    };

    const fillCredentials = (user, pass) => {
        setCredentials({ username: user, password: pass });
    };

    return (
        <div className="container-fluid p-0 min-vh-100 bg-white">
            <div className="row g-0 min-vh-100">
                {/* Lado Izquierdo: Imagen Hero */}
                <div className="col-lg-7 d-none d-lg-block position-relative">
                    <div 
                        className="h-100 w-100" 
                        style={{
                            backgroundImage: `url('/school_login_hero.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.7)'
                        }}
                    ></div>
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-75">
                        <h1 className="display-3 fw-bold mb-3 animate-fade-in">Escuela Innovadora</h1>
                        <p className="lead fs-4 opacity-75">Liderando el futuro de la educación con tecnología e innovación.</p>
                        <div className="d-flex justify-content-center gap-3 mt-5">
                            <div className="glass-card p-3 text-center" style={{ width: '120px' }}>
                                <h4 className="mb-0 fw-bold">1.2k</h4>
                                <small>Estudiantes</small>
                            </div>
                            <div className="glass-card p-3 text-center" style={{ width: '120px' }}>
                                <h4 className="mb-0 fw-bold">98%</h4>
                                <small>Eficiencia</small>
                            </div>
                            <div className="glass-card p-3 text-center" style={{ width: '120px' }}>
                                <h4 className="mb-0 fw-bold">24/7</h4>
                                <small>Soporte</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lado Derecho: Formulario de Inicio de Sesión */}
                <div className="col-lg-5 col-md-12 bg-white d-flex flex-column justify-content-center px-4 py-3 shadow-lg overflow-auto">
                    <div className="mx-auto w-100 mt-2" style={{ maxWidth: '420px' }}>
                        <div className="text-center mb-4">
                            <div className="bg-primary d-inline-block p-2 rounded-circle mb-2 shadow-primary">
                                <span className="fs-3">🏫</span>
                            </div>
                            <h3 className="fw-bold gradient-text mb-1">Bienvenido</h3>
                            <p className="text-muted small">Ingrese sus credenciales para acceder</p>
                        </div>

                        <form onSubmit={handleLogin} className="mb-4">
                            <div className="mb-3">
                                <label className="form-label smaller fw-bold text-uppercase text-secondary">Usuario</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 py-1"><i className="bi bi-person"></i></span>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-sm bg-light border-0" 
                                        placeholder="Ej: director1"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label smaller fw-bold text-uppercase text-secondary">Contraseña</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 py-1"><i className="bi bi-lock"></i></span>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        className="form-control form-control-sm bg-light border-0" 
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                        required
                                    />
                                    <button 
                                        className="btn btn-light border-0 py-1" 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-enterprise w-100 py-2 mt-2 shadow-sm fw-bold">
                                Iniciar Sesión
                            </button>
                        </form>

                        {/* Tabla de Credenciales de Demostración */}
                        <div className="modern-card p-3 bg-light shadow-sm border-0 rounded-4">
                            <div className="d-flex align-items-center mb-2">
                                <span className="me-2 smaller">🔑</span>
                                <h6 className="mb-0 fw-bold smaller">Credenciales de Prueba</h6>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-sm table-borderless align-middle mb-0" style={{ fontSize: '0.75rem' }}>
                                    <thead className="text-secondary opacity-75 text-uppercase">
                                        <tr>
                                            <th>Rol</th>
                                            <th>Usuario</th>
                                            <th>Clave</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles.map((r, idx) => (
                                            <tr key={idx} className="border-top border-light">
                                                <td className="py-1">
                                                    <span className="me-1">{r.icon}</span>
                                                    {r.label}
                                                </td>
                                                <td className="py-1 fw-bold">{r.user}</td>
                                                <td className="py-1 text-muted">{r.pass}</td>
                                                <td className="py-1 text-end">
                                                    <button 
                                                        className="btn btn-link btn-sm text-primary p-0 fw-bold"
                                                        style={{ fontSize: '0.65rem', textDecoration: 'none' }}
                                                        onClick={() => fillCredentials(r.user, r.pass)}
                                                    >
                                                        [Cargar]
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
