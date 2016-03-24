<?php

namespace App\Models\Access\Permission\Traits\Relationship;

/**
 * Class PermissionRelationship
 * @package App\Models\Access\Permission\Traits\Relationship
 */
trait PermissionRelationship
{
    /**
     * @return mixed
     */
    public function roles()
    {
        return $this->belongsToMany(config('access.role'), config('access.permission_role_table'), 'permission_id', 'role_id');
    }

    /**
     * @return mixed
     */
    public function users()
    {
        return $this->belongsToMany(config('auth.providers.users.model'), config('access.permission_user_table'), 'permission_id', 'user_id');
    }

    /**
     * @return mixed
     */
    public function operations()
    {
        return $this->hasMany(config('access.operation'), config('access.permission_user_table'), 'permission_id', 'user_id');
    }
}