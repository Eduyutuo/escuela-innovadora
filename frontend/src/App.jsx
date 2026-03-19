import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import DirectorDashboard from './pages/DirectorDashboard';
import SecretariaDashboard from './pages/SecretariaDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import AuxiliarDashboard from './pages/AuxiliarDashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import EnrollmentPage from './pages/EnrollmentPage';
import DiplomasPage from './pages/DiplomasPage';
import CoursesPage from './pages/CoursesPage';
import IncidentsPage from './pages/IncidentsPage';
import GradesPage from './pages/GradesPage';
import SchedulePage from './pages/SchedulePage';
import TeachersPage from './pages/TeachersPage';
import PaymentsPage from './pages/PaymentsPage';

// Simple Layout Components
const MainLayout = ({ children }) => {
  const { user } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="main-content d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg enterprise-navbar navbar-dark sticky-top py-3 px-3 px-lg-4">
          <div className="container-fluid p-0">
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-link text-white d-lg-none me-3 p-0" 
                onClick={toggleSidebar}
              >
                <i className="bi bi-list fs-2"></i>
              </button>
              <span className="navbar-brand d-flex align-items-center fw-bold">
                <span className="me-2 fs-3 d-none d-sm-inline">🏫</span>
                <span className="fs-5">Escuela Innovadora</span>
              </span>
            </div>

            <div className="d-flex align-items-center">
              <div className="text-white me-3 text-end d-none d-sm-block">
                <div className="small opacity-75" style={{ fontSize: '0.7rem' }}>Panel de {user?.role}</div>
                <div className="fw-bold small">{user?.name}</div>
              </div>
              <div className="dropdown">
                <div className="bg-accent rounded-circle p-1 cursor-pointer shadow-sm border border-white border-opacity-25" data-bs-toggle="dropdown">
                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                        {user?.name?.charAt(0)}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="container-fluid py-4 px-3 px-lg-5 animate-fade-in flex-grow-1">
            {children}
        </main>

        <footer className="footer bg-white border-top py-3 px-4 text-center mt-auto">
            <p className="text-secondary small mb-0">© 2024 Escuela Innovadora - Sistema de Gestión Institucional v2.0</p>
        </footer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 text-primary">Dashboard de {user?.role || 'Usuario'}</h2>
        <p className="text-muted">Bienvenido al panel central de la institución.</p>
      </div>
    </div>
  );
};



// Inline Login removed as it's now in its own file

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" />;
  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/director-dashboard" element={
            <ProtectedRoute>
              <DirectorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/secretaria-dashboard" element={
            <ProtectedRoute>
              <SecretariaDashboard />
            </ProtectedRoute>
          } />
          <Route path="/professor-dashboard" element={
            <ProtectedRoute>
              <ProfessorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/auxiliar-dashboard" element={
            <ProtectedRoute>
              <AuxiliarDashboard />
            </ProtectedRoute>
          } />
          {/* Module Routes */}
          <Route path="/matriculas" element={
            <ProtectedRoute>
              <EnrollmentPage />
            </ProtectedRoute>
          } />
          <Route path="/diplomas" element={
            <ProtectedRoute>
              <DiplomasPage />
            </ProtectedRoute>
          } />
          <Route path="/cursos" element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/incidencias" element={
            <ProtectedRoute>
              <IncidentsPage />
            </ProtectedRoute>
          } />
          <Route path="/notas" element={
            <ProtectedRoute>
              <GradesPage />
            </ProtectedRoute>
          } />
          <Route path="/horario" element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          } />
          <Route path="/maestros" element={
            <ProtectedRoute>
              <TeachersPage />
            </ProtectedRoute>
          } />
          <Route path="/pagos" element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
