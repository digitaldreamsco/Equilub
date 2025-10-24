<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;
    // filas en la database
    protected $fillable = [
        'name',
        'state',
        'default_roles',
    ];
}
