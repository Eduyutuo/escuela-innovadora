<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Enviar una notificación push en tiempo real a un usuario específico.
     */
    public function sendPush(User $user, string $title, string $message)
    {
        Log::info("PUSH NOTIFICATION [To: {$user->role} {$user->name}]: {$title} - {$message}");
        
        // La integración con Pusher/Ably o Firebase iría aquí
        return true;
    }
}
