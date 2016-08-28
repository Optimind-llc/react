<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

/**
 * Class RedirectIfAuthenticated
 * @package App\Http\Middleware
 */
class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            /*
             * ログイン済みであればルートパラメーターからschool_nameを取得して
             * connectionごとのダッシュボードへリダイレクト
             */
            return $request->route('school');

            if ($request->route('school')) {
                return redirect($request->route('school') . '/teacher/lectures');
            } else {
                return redirect('conference/teacher/dashboard');
            }
        }

        return $next($request);
    }
}
