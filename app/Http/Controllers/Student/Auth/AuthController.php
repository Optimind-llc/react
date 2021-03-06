<?php

namespace App\Http\Controllers\Student\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
// Requests
use Illuminate\Http\Request;
use App\Http\Requests\Student\Auth\SignupRequest;
use App\Http\Requests\Student\Auth\SigninRequest;
use App\Http\Requests\Student\Auth\SignoutRequest;
use App\Http\Requests\Student\Auth\ResendConfirmationEmailRequest;
use App\Http\Requests\Student\Auth\CheckApitokenRequest;
use App\Http\Requests\Student\Auth\DeviceidRequest;
// Models
use \App\Models\Student\Student;
// Exceptions
use App\Exceptions\ApiException;
// Jobs
use App\Jobs\Student\SendSignUpSucceedEmail;
use App\Jobs\Student\SendConfirmationEmail;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    protected $guard = 'students';

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * show signin form
     */
    public function showSigninForm()
    {
        return view('student.signin');
    }

    /**
     * Create a new user
     */
    public function signup(SignupRequest $request)
    {
        $student = Student::where('email', $request->email)->first();

        if ($student instanceof Student) {
            throw new ApiException('email.already_exist');
        }

        $student = new Student;

        $token = sha1(uniqid(mt_rand(), true));

        $student->family_name = $request->family_name;
        $student->given_name = $request->given_name;
        $student->email = $request->email;
        $student->password = bcrypt($request->password);
        $student->api_token = $token;
        $student->confirmation_code = md5(uniqid(mt_rand(), true));
        $student->confirmed = config('access.users.confirm_email') ? 0 : 1;
        $student->status = 1;
        $student->save();

        // Queue jobを使ってメール送信
        $this->dispatch(new SendSignUpSucceedEmail($student));

        return \Response::json(['api_token' => $token], 200);
    }

    /**
     * Get api_token from email and password
     */
    public function signin(SigninRequest $request)
    {
        $student = Student::where('email', $request->email)->first();

        if (!$student instanceof Student) {
            throw new ApiException('email.not_found');
        }

        if (!\Auth::guard('students')->once($request->all())) {
            throw new ApiException('password.not_correct');
        }

        $student = \Auth::guard('students')->user();

        $student->api_token = sha1(uniqid(mt_rand(), true));
        $student->save();

        return \Response::json([
            'api_token' => $student->api_token,
            'family_name' => $student->family_name,
            'given_name' => $student->given_name,
            'confirmed' => $student->confirmed
        ], 200);
    }

    public function signout(SignoutRequest $request)
    {
        $student = Student::where('api_token', $request->api_token)->first();

        if (!$student instanceof Student) {
            throw new ApiException('student.not_found');
        }

        $student->api_token = sha1(uniqid(mt_rand(), true));
        $student->save();

        $message = 'signout.success';

        return \Response::json([
            'type' => $message,
            'message' => 'サインアウトしました'
        ], 200);
    }

    public function apitoken(CheckApitokenRequest $request)
    {
        $student = $this->findByApitoken($request->api_token);

        // $student->api_token = sha1(uniqid(mt_rand(), true));
        // $student->save();

        return \Response::json([
            'confirmed' => $student->confirmed,
            'api_token' => $student->api_token
        ], 200);
    }

    /**
     * Get student from email
     */
    public function findByEmail($email) {
        $student = Student::where('email', $email)->first();

        if (!$student instanceof Student) {
            throw new ApiException('email.not_found');
        }

        return $student;
    }

    /**
     * Get student from API token
     */
    public function findByApitoken($api_token) {
        $student = Student::where('api_token', $api_token)->first();

        if (!$student instanceof Student) {
            throw new ApiException('api_token.not_found');
        }

        return $student;
    }

    public function confirmAccount($token)
    {
        $student = Student::where('confirmation_code', $token)->first();
        $message = 'メールアドレスの確認が完了しました。アプリを起動してログインしてください。';

        if (!$student instanceof Student) {
            // throw new ApiException('confirmation.not_found');
            $message = 'URLが一致しません。アプリから確認メールの再送信を行ってからもう一度実行してください。';
            return view('student.confirmSuccess', compact('message'));
        }

        if ($student->confirmed == 1) {
            // throw new ApiException('confirmation.already_confirmed');
            $message = 'すでにメールアドレスの確認が完了しています。';
        }

        if ($student->confirmation_code != $token) {
            // throw new ApiException('confirmation.mismatch');
            $message = 'URLが一致しません。アプリから確認メールの再送信を行ってからもう一度実行してください。';
        }

        $student->confirmed = 1;
        $student->save();

        return view('student.confirmSuccess', compact('message'));
    }

    public function resendConfirmationEmail()
    {
        $student = \Auth::guard('students_api')->user();

        if (!$student instanceof Student) {
            throw new ApiException('student.not_found');
        }

        // Queue jobを使ってメール送信
        $this->dispatch(new SendConfirmationEmail($student));

        $message = 'resendConfirm.success';

        return \Response::json([
            'type' => $message,
            'message' => '確認メールを再送信しました'
        ], 200);
    }

    /**
     * Create a new user by deviceid
     */
    public function deviceid(DeviceidRequest $request)
    {
        $student = Student::where('device_id', $request->device_id)->first();

        if (!$student instanceof Student) {
            // Create a new student
            $student = new Student;

            $token = sha1(uniqid(mt_rand(), true));

            $student->family_name = 'deviceid';
            $student->given_name = 'deviceid';
            $student->email = 'device_id=' . $request->device_id;
            $student->password = null;
            $student->device_id = $request->device_id;
            $student->device_os = $request->device_os;
            $student->api_token = $token;
            $student->confirmation_code = md5(uniqid(mt_rand(), true));
            $student->confirmed = config('access.users.confirm_email') ? 0 : 1;
            $student->status = 1;
            $student->save();
        } else {
            $token = $student->api_token;
        }

        return \Response::json(['api_token' => $token], 200);
    }
}
