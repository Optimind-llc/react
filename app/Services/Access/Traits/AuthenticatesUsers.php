<?php

namespace App\Services\Access\Traits;

use Illuminate\Http\Request;
use App\Exceptions\GeneralException;
use App\Events\Frontend\Auth\UserLoggedIn;
use App\Events\Frontend\Auth\UserLoggedOut;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use App\Http\Requests\Frontend\Auth\LoginRequest;
// Models
use App\Models\Student\Affiliation;

/**
 * Class AuthenticatesUsers
 * @package App\Services\Access\Traits
 */
trait AuthenticatesUsers
{
    use RedirectsUsers;

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showLoginForm($connection_name)
    {
        $connection = Affiliation::where('connection_name', $connection_name)->firstOrFail();

        $db_name = $connection->db_name;
        $name = $connection->name;
        $logo_path = $connection->logo_path;
        $image_path = $connection->image_path;

        return view('frontend.auth.login', compact('connection_name', 'db_name', 'name', 'logo_path', 'image_path'))
            ->withSocialiteLinks($this->getSocialLinks());
    }

    /**
     * @param LoginRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function login($school, LoginRequest $request)
    {
        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        $throttles = in_array(
            ThrottlesLogins::class, class_uses_recursive(get_class($this))
        );

        if ($throttles && $this->hasTooManyLoginAttempts($request)) {
            return $this->sendLockoutResponse($request);
        }

        if (auth()->attempt($request->only($this->loginUsername(), 'password'), $request->has('remember'))) {
            return $this->handleUserWasAuthenticated($request, $throttles);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        if ($throttles) {
            $this->incrementLoginAttempts($request);
        }

        return redirect()->back()
            ->withInput($request
            ->only($this->loginUsername(), 'remember'))
            ->withErrors([
                $this->loginUsername() => trans('auth.failed')
            ]);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        /**
         * Remove the socialite session variable if exists
         */
        if (app('session')->has(config('access.socialite_session_name'))) {
            app('session')->forget(config('access.socialite_session_name'));
        }

        event(new UserLoggedOut(access()->user()));
        auth()->logout();
        return redirect(property_exists($this, 'redirectAfterLogout') ? $this->redirectAfterLogout : '/');
    }

    /**
     * This is here so we can use the default Laravel ThrottlesLogins trait
     *
     * @return string
     */
    public function loginUsername()
    {
        return 'email';
    }

    /**
     * @param Request $request
     * @param $throttles
     * @return \Illuminate\Http\RedirectResponse
     * @throws GeneralException
     */
    protected function handleUserWasAuthenticated(Request $request, $throttles)
    {
        if ($throttles) {
            $this->clearLoginAttempts($request);
        }

        /**
         * Check to see if the users account is confirmed and active
         */
        if (! access()->user()->isConfirmed())
        {
            $token = access()->user()->confirmation_code;
            auth()->logout();
            throw new GeneralException(trans(
                'exceptions.frontend.auth.confirmation.resend',
                [
                    'school' => $request->route('school'),
                    'token' => $token
                ]
            ));
        }
        elseif (! access()->user()->isActive())
        {
            auth()->logout();
            throw new GeneralException(trans('exceptions.frontend.auth.deactivated'));
        }

        event(new UserLoggedIn(access()->user()));
        return redirect()->intended($this->redirectPath());
    }

    /**
     * @param LoginRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function conferenceLogin(LoginRequest $request)
    {
        $throttles = in_array(
            ThrottlesLogins::class, class_uses_recursive(get_class($this))
        );

        if ($throttles && $this->hasTooManyLoginAttempts($request)) {
            return $this->sendLockoutResponse($request);
        }

        if (\Auth::guard('sponsor')->attempt($request->only($this->loginUsername(), 'password'), $request->has('remember'))) {

            $user = \Auth::guard('sponsor')->user();

            if ($throttles) {
                $this->clearLoginAttempts($request);
            }

            // if (!$user->isConfirmed())
            // {
            //     $token = $user->confirmation_code;
            //     \Auth::guard('sponsor')->logout();
            //     throw new GeneralException(trans(
            //         'exceptions.frontend.auth.confirmation.resend',
            //         [
            //             'school' => $request->route('school'),
            //             'token' => $token
            //         ]
            //     ));
            // }
            // elseif (!$user->isActive())
            // {
            //     \Auth::guard('sponsor')->logout();
            //     throw new GeneralException(trans('exceptions.frontend.auth.deactivated'));
            // }

            return redirect('conference/teacher/dashboard');
        }

        if ($throttles) {
            $this->incrementLoginAttempts($request);
        }

        return 'fail to login';

        return redirect()->back()
            ->withInput($request
            ->only($this->loginUsername(), 'remember'))
            ->withErrors([
                $this->loginUsername() => trans('auth.failed')
            ]);
    }

    public function conferenceLogout()
    {
        if (app('session')->has(config('access.socialite_session_name'))) {
            app('session')->forget(config('access.socialite_session_name'));
        }

        $auth = \Auth::guard('sponsor');
        $auth->logout();
        return redirect($this->redirectAfterLogout);
    }
}
