<?php

namespace App\Models\Access\User;

use App\Models\Access\User\Traits\UserAccess;
use App\Models\Access\User\Traits\UserLecture;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Access\User\Traits\Attribute\UserAttribute;
use App\Models\Access\User\Traits\Relationship\UserRelationship;
use App\Models\CustomRelations;
// Models
use App\Models\Student\Affiliation;

/**
 * Class User
 * @package App\Models\Access\User
 */
class User extends Authenticatable
{
    use SoftDeletes, UserAccess, UserLecture, UserAttribute, UserRelationship, CustomRelations;

    public $connection;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * set connection from url parameters
     */
    public function __construct()
    {
        $connection_name = \Request::route('school');
        $connection = Affiliation::where('connection_name', $connection_name)->firstOrFail();

        if (isset($connection_name)) {
            $this->setConnection($connection->db_name);
        }
    }
}
