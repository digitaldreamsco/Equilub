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
        Schema::create('lubrications_study', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id')->nullable();
            $table->unsignedBigInteger('machine_id');
            $table->json('documents')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->text('recommendations')->nullable();
            $table->string('status')->default('pending'); // pending, completed, approved
            $table->date('study_date')->nullable();
            $table->timestamps();

            // Índices y claves foráneas
            $table->index('machine_id');
            $table->index('service_id');
            
            // Foreign keys (comentadas por ahora hasta que tengamos las tablas relacionadas)
            // $table->foreign('machine_id')->references('id')->on('machine')->onDelete('cascade');
            // $table->foreign('service_id')->references('id')->on('services')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lubrications_study');
    }
};
