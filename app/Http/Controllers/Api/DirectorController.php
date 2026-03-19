<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    /**
     * Obtener estadísticas del Panel de BI para el Director.
     */
    public function getStats()
    {
        // Simulando datos de BI para el factor "wow" del frontend
        return response()->json([
            'enrollment_growth' => [
                'labels' => ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                'data' => [45, 52, 60, 48, 70, 85]
            ],
            'attendance_avg' => 92.4,
            'active_incidents' => 3,
            'recent_alerts' => [
                ['id' => 1, 'title' => 'Avería Eléctrica Pabellón B', 'severity' => 'critical', 'time' => 'hace 10 min'],
                ['id' => 2, 'title' => 'Falta de material Lab 1', 'severity' => 'medium', 'time' => 'hace 1 hora'],
            ],
            'total_students' => 1250,
            'revenue_status' => '85%'
        ]);
    }
}
