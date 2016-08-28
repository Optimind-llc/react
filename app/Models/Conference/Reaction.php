<?php

namespace App\Models\Conference;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Student\Student;

class Reaction extends Model
{
	use SoftDeletes;

    protected $connection;

    /**
     * 複数代入の許可
     */
    protected $guarded = ['id'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * set connection from url parameters
     */
    public function __construct()
    {
        $school = 'conference';
        if (isset($school)) {
            $this->setConnection($school);
        }
    }

    public function conference()
    {
        return $this->belongsTo('App\Models\Conference\Conference');
    }
}