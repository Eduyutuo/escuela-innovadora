<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('director')->group(function () {
    Route::get('/stats', [\App\Http\Controllers\Api\DirectorController::class, 'getStats']);
});
