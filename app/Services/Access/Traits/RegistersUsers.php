<?php

namespace App\Services\Access\Traits;

use Illuminate\Support\Facades\Auth;
use App\Events\Frontend\Auth\UserRegistered;
use App\Http\Requests\Frontend\Auth\RegisterRequest;
use App\Models\Access\User\User;
// Jobs
use App\Jobs\Teacher\SendSignUpSucceedEmail;
// Models
use App\Models\Student\Affiliation;

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
    public function showRegistrationForm($connection_name)
    {
        $connection = Affiliation::where('connection_name', $connection_name)->firstOrFail();

        $db_name = $connection->db_name;
        $name = $connection->name;
        $logo_path = $connection->logo_path;
        $image_path = $connection->image_path;

        return view('frontend.auth.register', compact('connection_name', 'db_name', 'name', 'logo_path', 'image_path'))
            ->withSocialiteLinks($this->getSocialLinks());
    }

    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function register(RegisterRequest $request)
    {
        $connection = Affiliation::where('connection_name', $request->route('school'))->firstOrFail();
        $db_name = $connection->db_name;

        if ($this->user->findByEmail($request->email) instanceof User) {
            return redirect()->route('auth.register', $db_name)->withFlashDanger(trans('exceptions.frontend.auth.email_taken'));
        }

        if (config('access.users.confirm_email'))
        {
            $user = $this->user->create($request->all());

            $this->dispatch(new SendSignUpSucceedEmail($user));
            event(new UserRegistered($user));

            return redirect()->route('auth.login', $db_name)->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.created_confirm'));
        }
        else
        {
            auth()->login($this->user->create($request->all()));
            event(new UserRegistered(access()->user()));
            return redirect($this->redirectPath());
        }
    }
}
