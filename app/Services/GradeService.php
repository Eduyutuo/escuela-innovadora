<?php

namespace App\Services;

use App\Models\AttendanceLog;
use App\Models\AcademicRecord;
use Illuminate\Support\Facades\Log;

class GradeService
{
    /**
     * Verificar si un profesor puede cerrar las notas de un estudiante.
     * Regla de cumplimiento: La asistencia debe ser ≥ 70%.
     */
    public function canCloseGrades(AcademicRecord $record): bool
    {
        $attendanceCount = AttendanceLog::where('user_id', $record->student_id)
            ->where('type', 'entry')
            // Agregar filtrado lógico por periodo/curso aquí
            ->count();
        
        $requiredAttendance = 20; // Umbral de ejemplo
        
        if ($attendanceCount < $requiredAttendance) {
            Log::warning("Compliance Alert: Student {$record->student_id} has insufficient attendance ({$attendanceCount}).");
            return false;
        }

        return true;
    }

    public function submitGrade(AcademicRecord $record, $grade)
    {
        if (!$this->canCloseGrades($record)) {
            throw new \Exception("Cumplimiento insuficiente: No se puede registrar la nota (Mínimo 70% de asistencia requerido).");
        }

        $record->update(['grade' => $grade, 'status' => 'completed']);
        return $record;
    }
}
