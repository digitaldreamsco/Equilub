<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermissionHasUsers extends Model
{
    use HasFactory;
    protected $table = 'permission_has_users';
    protected $visible = ['permission_id'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function permission(): BelongsTo
    {
        return $this->belongsTo(permission::class, 'permission_id');
    }

}
