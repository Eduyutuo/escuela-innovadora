<?php

namespace App\Observers;

use App\Models\Incident;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Log;

class IncidentObserver
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Manejar el evento "creado" de Incident.
     */
    public function created(Incident $incident): void
    {
        if ($incident->severity === 'critical') {
            Log::alert("CRITICAL INCIDENT REPORTED: {$incident->title}. Alerting all Directors.");
            
            $directors = User::where('role', 'director')->get();
            
            foreach ($directors as $director) {
                $this->notificationService->sendPush(
                    $director, 
                    "ALERTA CRÍTICA: " . $incident->title,
                    $incident->description
                );
            }
        }
    }
}
