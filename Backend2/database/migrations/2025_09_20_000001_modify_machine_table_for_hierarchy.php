<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('machine', function (Blueprint $table) {
            // Agregar campo para estructura jerárquica
            $table->unsignedBigInteger('parent_id')->nullable()->after('id');
            $table->string('equipment_type')->default('equipment')->after('type'); // equipment, subequipment, component, part
            $table->json('hierarchy_data')->nullable()->after('description'); // Para datos adicionales de jerarquía
            $table->integer('hierarchy_level')->default(0)->after('hierarchy_data'); // Nivel en la jerarquía (0=equipo principal)
            $table->string('full_path')->nullable()->after('hierarchy_level'); // Ruta completa como string para búsquedas
            
            // Índices para optimizar consultas
            $table->index('parent_id');
            $table->index('equipment_type');
            $table->index('hierarchy_level');
            $table->index('full_path');
            
            // Clave foránea
            $table->foreign('parent_id')->references('id')->on('machine')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('machine', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropIndex(['parent_id']);
            $table->dropIndex(['equipment_type']);
            $table->dropIndex(['hierarchy_level']);
            $table->dropIndex(['full_path']);
            $table->dropColumn(['parent_id', 'equipment_type', 'hierarchy_data', 'hierarchy_level', 'full_path']);
        });
    }
};
