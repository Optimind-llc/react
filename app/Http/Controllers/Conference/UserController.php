<?php

namespace App\Http\Controllers\Conference;

use App\Http\Controllers\Controller;
//Requests
use Illuminate\Http\Request;
//Models
use App\Models\Conference\User;
use App\Models\Conference\Conference;

/**
 * Class UserController
 */
class UserController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        $school = 'conference';

        return view('teacher.index', compact('domain', 'env', 'school'));
    }

    /**
     * @return \Illuminate\View\View
     */
    public function info(Request $request)
    {
        // $user = \Auth::guard('sponsor')->user();
        // $user = User::first();
        $user = User::where('corporate_name', $request->connection_name)->firstOrFail();
        // $name = $user->family_name . " " . $user->given_name;
        $name = $user->family_name;
        $lectures = $user->conferences()->count();

        return \Response::json([
            'hasRole' => true,
            'id' => $user->id,
            'email' => $user->email,
            'name' => $name,
            'confirmed' => true,
            'lectures' => $lectures
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function profile($school)
    {
        $user = \Auth::guard('users')->user();
        return \Response::json($user, 200);
    }
}
