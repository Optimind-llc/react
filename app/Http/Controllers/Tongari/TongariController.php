<?php

namespace App\Http\Controllers\Tongari;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
// Exceptions
use App\Exceptions\ApiException;
//Models
use App\Models\Student\Student;
use App\Models\Conference\User;
use App\Models\Conference\Conference;
use App\Models\Conference\Message;
use App\Models\Conference\Like;
use App\Models\Conference\Reaction;
//Requests
use Illuminate\Http\Request;

/**
 * Class TongariController
 */
class TongariController extends Controller
{
    public function index()
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        $school = 'conference';
        $conference_id = 1;

        return view('audience.index', compact('domain', 'env', 'school', 'conference_id'));
    }

    public function createAuditor()
    {
        $unique_token = md5(uniqid(mt_rand(), true));

        $auditor = new Student;
        $auditor->email = $unique_token . '@anonymous.auditor';
        $auditor->family_name = 'anonymous';
        $auditor->given_name = 'auditor';
        $auditor->confirmed = 1;
        $auditor->api_token = $unique_token;
        $auditor->confirmation_code = 0;
        $auditor->save();

        return \Response::json([
            'code' => $unique_token
        ], 200);
    }

    public function vote(Request $request)
    {
        return \Response::json([
            'message' => 'success'
        ], 200);
    }
}
