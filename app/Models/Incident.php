<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\IncidentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([IncidentObserver::class])]
class Incident extends Model
{
    protected $fillable = ['title', 'description', 'status', 'severity', 'reporter_id', 'resolved_by'];

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function resolver()
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }
}
