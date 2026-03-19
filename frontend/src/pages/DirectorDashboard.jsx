import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import StudentRoster from '../components/StudentRoster';
import CourseList from '../components/CourseList';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DirectorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos de demostración con estructura mejorada
    setTimeout(() => {
      setStats({
          enrollment_growth: {
              labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
              data: [45, 52, 60, 48, 70, 85]
          },
          attendance_avg: 92.4,
          active_incidents: 3,
          recent_alerts: [
              {id: 1, title: 'Avería Eléctrica Pabellón B', severity: 'critical', time: 'Hace 10 min', description: 'Falla en el transformador principal.'},
              {id: 2, title: 'Falta de material Laboratorio 1', severity: 'medium', time: 'Hace 1 hora', description: 'Reactivos químicos agotados.'},
          ],
          total_students: 1250,
          revenue_status: '85%'
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p className="fw-bold text-secondary">Cargando Inteligencia Institucional...</p>
        </div>
    </div>
  );

  const chartData = {
    labels: stats.enrollment_growth.labels,
    datasets: [
      {
        label: 'Matrículas',
        data: stats.enrollment_growth.data,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
        y: { grid: { display: false }, border: { display: false } },
        x: { grid: { display: false }, border: { display: false } }
    }
  };

  return (
    <div className="py-2">
      <header className="mb-5 d-flex justify-content-between align-items-end flex-wrap gap-3">
        <div>
            <h1 className="display-6 fw-bold gradient-text mb-1">Director General</h1>
            <p className="text-secondary mb-0">Vista panorámica del rendimiento académico y operativo.</p>
        </div>
        <div className="text-end">
            <div className="badge bg-success-subtle text-success p-2 rounded-pill px-3 mb-2">
                <span className="me-1">●</span> Sincronizado
            </div>
            <p className="small text-muted mb-0">Última actualización: Hoy, 17:00</p>
        </div>
      </header>

      {/* Grilla de Estadísticas */}
      <div className="row g-4 mb-5">
        {[
          { label: 'Estudiantes', value: stats.total_students, color: 'primary', icon: 'bi-people', trend: '+12%' },
          { label: 'Asistencia', value: `${stats.attendance_avg}%`, color: 'success', icon: 'bi-calendar-check', trend: 'Estable' },
          { label: 'Incidencias', value: stats.active_incidents, color: 'danger', icon: 'bi-exclamation-triangle', trend: '-2' },
          { label: 'Pagos', value: stats.revenue_status, color: 'info', icon: 'bi-cash-coin', trend: '+5%' },
        ].map((item, idx) => (
          <div className="col-md-3 col-sm-6" key={idx}>
            <div className="modern-card card h-100 p-3 shadow-sm border-0">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className={`stats-icon bg-${item.color}-subtle text-${item.color}`}>
                    <i className={`bi ${item.icon} fs-4`}></i>
                </div>
                <span className={`badge bg-${item.color}-subtle text-${item.color} rounded-pill`}>{item.trend}</span>
              </div>
              <p className="text-secondary small fw-bold text-uppercase mb-1">{item.label}</p>
              <h2 className="fw-bold mb-0">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Sección de Gráfico Principal */}
        <div className="col-lg-8">
          <div className="modern-card card p-4 shadow-sm border-0 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Crecimiento de Matrículas</h5>
                <select className="form-select form-select-sm w-auto border-0 bg-light">
                    <option>Últimos 6 meses</option>
                    <option>Año 2023</option>
                </select>
            </div>
            <div style={{ height: '280px' }}>
                <Bar options={chartOptions} data={chartData} />
            </div>
          </div>
          
          <StudentRoster />
        </div>

        {/* Barra Lateral de Alertas y Cursos */}
        <div className="col-lg-4">
          <div className="modern-card card h-100 overflow-hidden shadow-sm border-0">
            <div className="card-header bg-white border-0 py-4 px-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Alertas Críticas</h5>
                <span className="badge bg-danger rounded-pill">{stats.recent_alerts.length}</span>
              </div>
            </div>
            <div className="card-body p-0 border-top">
              {stats.recent_alerts.map((alert, idx) => (
                <div className={`p-4 border-bottom hover-bg-light transition-base cursor-pointer`} key={alert.id}>
                    <div className="d-flex align-items-start mb-2">
                        <div className={`p-2 rounded-circle bg-${alert.severity === 'critical' ? 'danger' : 'warning'} me-3`}></div>
                        <div className="w-100">
                            <div className="d-flex justify-content-between">
                                <h6 className="mb-0 fw-bold small">{alert.title}</h6>
                                <span className="small text-muted">{alert.time}</span>
                            </div>
                            <p className="small text-muted mb-0 mt-1">{alert.description}</p>
                        </div>
                    </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-light">
                <CourseList />
            </div>

            <div className="card-footer bg-white border-0 text-center py-3 mt-auto">
              <button className="btn btn-link btn-sm text-decoration-none fw-bold text-primary">Gestionar Incidencias →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;
