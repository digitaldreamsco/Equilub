<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roles extends Model
{
    use HasFactory;

    public function roles(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function permissionRole(): HasMany
    {
        return $this->HasMany(Permission_has_users::class);
    }
}
