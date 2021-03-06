<?php

namespace App\Http\Controllers\Conference;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
//Models
use App\Models\Conference\User;
use App\Models\Conference\Conference;
//Requests
use Illuminate\Http\Request;
//Exceptions
use App\Exceptions\ApiException;

/**
 * Class DashboardController
 */
class DashboardController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $domain = env('APP_URL');
        $env = env('APP_ENV');
        $school = 'conference';
        $connection = $request->connection_name;

        /***** HARD CODE *****/
        $list = ['brother', 'engineer'];

        if (!in_array($connection, $list, true)) {
            abort(404);
        }

        return view('teacher.index', compact('domain', 'env', 'school', 'connection'));
    }

    /**
     * @return \Illuminate\View\View
     */
    public function test(Request $request)
    {
        // $user = \Auth::guard('sponsor')->user();
        $user = User::where('corporate_name', $request->connection_name)->firstOrFail();
        $conference = $user->conferences()->where('status', 1)->first();

        if (!$conference instanceof Conference) {
            return \Response::json([
                'exist' => false,
                'conference' => null,
                'reactions' => null
            ], 200);
        }

        return \Response::json([
            'exist' => true,
            'conference' => $conference,
            'reactions' => $conference->reactions()->get()->map(function ($item, $key) {
                return [
                    'auditor_id' => strval($item->auditor_id),
                    'type' => strval($item->type),
                    'created_at' => $item->created_at->timestamp
                ];
            }),
        ], 200);
    }

    /**
     * @return \Illuminate\View\View
     */
    public function message(Request $request)
    {
        $user = User::where('corporate_name', $request->connection_name)->firstOrFail();
        $conference = $user->conferences()->where('status', 1)->first();

        if (!$conference) {
            return \Response::json([], 200);
        }

        if (!$conference->messages) {
            return \Response::json([], 200);
        }

        $messages = $conference->messages()
            ->with('likes')
            ->where('deleted_at', null)
            ->orderBy('created_at')
            ->get()
            ->map(function ($item, $key) {
                return [
                    'id' => $item['id'],
                    'key' => $key + 1,
                    'text' => $item['text'],
                    'time' => $item['created_at']->timestamp,
                    'type' => $item['type'],
                    'likes' => $item['likes']->count(),
                ];
            });

        return \Response::json($messages, 200);
    }

    public function test2()
    {
        $user = \Auth::guard('users')->user();
        $room = $user
            ->rooms()
            ->where('closed_at', null)
            ->select('id', 'lecture_id', 'length', 'created_at', 'key')
            ->first();

        $reactions = Reaction::allReactionEvent(1, $room->id)
            // ->select(DB::raw('student_id, type_id, MAX(created_at)'))
            ->select(['student_id', 'type_id', 'created_at'])
            // ->groupBy('student_id')
            ->get();

        $next = $reactions->map(function ($item, $key) {
            return [
                'student_id' => $item->student_id,
                'type_id' => $item->type_id,
                'created_at' => $item->created_at->timestamp
            ];
        });

        return \Response::json([
            'room' => $room,
            'reactions' => $next
            // 'reactions' => [
            //     '0' => [
            //         'student_id' => 1,
            //         'type_id' => 1,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 30, 00)->timestamp
            //     ],
            //     '1' => [
            //         'student_id' => 1,
            //         'type_id' => 1,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 32, 00)->timestamp
            //     ],
            //     '2' => [
            //         'student_id' => 2,
            //         'type_id' => 1,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 34, 00)->timestamp
            //     ],
            //     '3' => [
            //         'student_id' => 2,
            //         'type_id' => 2,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 35, 00)->timestamp
            //     ],
            //     '4' => [
            //         'student_id' => 2,
            //         'type_id' => 3,
            //         'created_at' => Carbon::create(2016, 5, 17, 21, 36, 00)->timestamp
            //     ]
            // ]
        ], 200);
    }
}
