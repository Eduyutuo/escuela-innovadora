<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\AcademicRecord;
use App\Models\Incident;
use Illuminate\Support\Facades\Hash;

class InstitutionalSeeder extends Seeder
{
    /**
     * Poblar la base de datos institucional.
     */
    public function run(): void
    {
        // 1. Crear Roles
        $director = User::create([
            'name' => 'Dr. Carlos Mendoza',
            'email' => 'director@escuela.edu',
            'password' => Hash::make('password'),
            'role' => 'director',
        ]);

        $secretaria = User::create([
            'name' => 'Lic. Ana Rojas',
            'email' => 'secretaria@escuela.edu',
            'password' => Hash::make('password'),
            'role' => 'secretaria',
        ]);

        $profesor = User::create([
            'name' => 'Prof. Roberto Gomez',
            'email' => 'profesor@escuela.edu',
            'password' => Hash::make('password'),
            'role' => 'profesor',
        ]);

        $student = User::create([
            'name' => 'Alumno Test',
            'email' => 'alumno@escuela.edu',
            'password' => Hash::make('password'),
            'role' => 'estudiante',
        ]);

        // 2. Crear un Registro Académico (Matrícula)
        $record = AcademicRecord::create([
            'student_id' => $student->id,
            'course_id' => 1,
            'grade' => null,
            'period_id' => 2024,
            'status' => 'active',
            'is_paid' => false
        ]);

        echo "Seeding completed successfully.\n";
    }
}
