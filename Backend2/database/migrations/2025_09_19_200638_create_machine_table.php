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
        Schema::create('machine', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('state')->default('Operativo');
            $table->string('type')->nullable();
            $table->text('observation')->nullable();
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->string('model')->nullable();
            $table->string('brand')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('machine');
    }
};
