<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Crear usuario de prueba
        User::updateOrCreate([
            'email' => 'admin@equilub.com'
        ], [
            'name' => 'Admin',
            'email' => 'admin@equilub.com',
            'password' => Hash::make('password123'),
            'roles_id' => 2 // super-admin
        ]);
    }
}
