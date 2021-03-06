<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index($school)
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        return view('teacher.index', compact('domain', 'env', 'school'));
    }

    /**
     * @return \Illuminate\View\View
     */
    public function info($school)
    {
        $user = \Auth::guard('users')->user();
        $name = $user->family_name . " " . $user->given_name;
        $lectures = $user->lectures()->count();

        return \Response::json([
            'hasRole' => $user->hasRole('Teacher'),
            'confirmed' => $user->teacher_confirmed == 1 ? true : false,
            'email' => $user->email,
            'id' => $user->id,
            'name' => $name,
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
