<?php

namespace App\Services\Access\Traits;

use Illuminate\Support\Facades\Auth;
use App\Events\Frontend\Auth\UserRegistered;
use App\Http\Requests\Frontend\Auth\RegisterRequest;
use App\Models\Access\User\User;
// Jobs
use App\Jobs\Teacher\SendSignUpSucceedEmail;

/**
 * Class RegistersUsers
 * @package App\Services\Access\Traits
 */
trait RegistersUsers
{
    use RedirectsUsers;

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showRegistrationForm()
    {
        return view('frontend.auth.register');
    }

    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function register(RegisterRequest $request)
    {
        if ($this->user->findByEmail($request->email) instanceof User) {
            return redirect()->route('auth.register', [$request->route('school')])->withFlashDanger(trans('exceptions.frontend.auth.email_taken'));
        }

        if (config('access.users.confirm_email'))
        {
            $user = $this->user->create($request->all());

            $this->dispatch(new SendSignUpSucceedEmail($user));
            event(new UserRegistered($user));

            return redirect()->route('auth.login', [$request->route('school')])->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.created_confirm'));
        }
        else
        {
            auth()->login($this->user->create($request->all()));
            event(new UserRegistered(access()->user()));
            return redirect($this->redirectPath());
        }
    }
}
