<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceLog extends Model
{
    protected $fillable = ['user_id', 'timestamp', 'location', 'type'];

    protected $casts = [
        'timestamp' => 'datetime',
        'location' => 'string', // Gestionado por GIS espacial en la base de datos
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
