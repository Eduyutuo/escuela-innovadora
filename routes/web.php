<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    $path = public_path('index.html');
    if (!file_exists($path)) {
        return "ERROR: Frontend build file (index.html) not found in public directory. Current path: " . $path;
    }
    return file_get_contents($path);
})->where('any', '.*');
