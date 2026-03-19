<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Observers\EnrollmentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([EnrollmentObserver::class])]
class AcademicRecord extends Model
{
    protected $fillable = ['student_id', 'course_id', 'grade', 'period_id', 'status'];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
