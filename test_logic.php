<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\AcademicRecord;
use App\Models\Incident;
use App\Models\User;

echo "--- TESTING BUSINESS LOGIC ---\n";

// 1. Test Enrollment Observer (Auto-provisioning)
$record = AcademicRecord::first();
echo "Testing Enrollment Auto-provisioning for: " . $record->student->name . "\n";
$record->update(['is_paid' => true]);
echo "Check logs for Virtual Classroom provisioning...\n";

// 2. Test Incident Observer (Critical Alert)
echo "\nTesting Critical Incident Alerting...\n";
$reporter = User::where('role', 'auxiliar')->first() ?? User::where('role', 'profesor')->first();
Incident::create([
    'title' => 'Emergencia Electrica Pabellón C',
    'description' => 'Cortocircuito en el laboratorio 2. Se requiere atención inmediata.',
    'severity' => 'critical',
    'reporter_id' => $reporter->id,
    'status' => 'open'
]);
echo "Check logs for Director PUSH notification...\n";

echo "\n--- TESTING FINISHED ---\n";
