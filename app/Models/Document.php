<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['owner_id', 'filename', 'path', 'type', 'is_signed'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
