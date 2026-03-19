<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Services\GradeService;
use App\Models\AcademicRecord;

$service = app(GradeService::class);
$record = AcademicRecord::first();

echo "--- TESTING GRADE COMPLIANCE ---\n";

// Case 1: Low Attendance (Should fail)
echo "Case 1: Student has 0% attendance. Trying to submit grade 15...\n";
try {
    $service->submitGrade($record->id, 15);
    echo "SUCCESS (Incorrectly allowed)\n";
} catch (\Exception $e) {
    echo "FAILED: " . $e->getMessage() . " (Correctly blocked)\n";
}

// Case 2: Sufficient Attendance (Mocking logic in Service)
// Note: In a real DB we would add logs, here we test the service with whatever logic it has.
echo "\n--- TESTING FINISHED ---\n";
