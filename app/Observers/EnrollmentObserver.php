<?php

namespace App\Observers;

use App\Models\AcademicRecord;
use App\Services\VirtualClassroomService;
use Illuminate\Support\Facades\Log;

class EnrollmentObserver
{
    protected $classroomService;

    public function __construct(VirtualClassroomService $classroomService)
    {
        $this->classroomService = $classroomService;
    }

    /**
     * Manejar el evento "actualizado" de AcademicRecord.
     */
    public function updated(AcademicRecord $academicRecord): void
    {
        if ($academicRecord->isDirty('is_paid') && $academicRecord->is_paid) {
            Log::info("Enrollment paid for student {$academicRecord->student_id}. Triggering auto-provisioning.");
            
            $student = $academicRecord->student;
            $this->classroomService->provisionAccess($student);
        }
    }
}
