<?php namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserPostRequest;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    protected $userId;

    public function __construct()
    {
        if (Auth::check()) {
            $this->userId = Auth::user()->id;
        }
    }

    public function index(Request $request)
    {
        $data = $request->all();

        if (!empty($data['query'])) {
            $data['users_id'][] = $this->userId;

            $users = User::whereNotIn('id', $data['users_id'])
                ->where(function ($query) use ($data) {
                    $query->where('first_name', 'LIKE', '%' . $data['query'] . '%')
                        ->orWhere('last_name',  'LIKE', '%' . $data['query'] . '%');
                })
                ->get(['id', 'first_name', 'last_name']);

            return response()->json($users);
        } else {
            $arr[] = $this->userId;
            $users = User::whereNotIn('id', $arr)->get();
            return response()->json($users);
        }

        return response()->json([], 400);
    }

    public function allUsers(Request $request)
    {
        $data = $request->all();
        return response()->json(User::all(), 200);
    }

    public function store(StoreUserPostRequest $req)
    {
        $user = User::create($req->only(
            'email',
            'password_hash',
            'first_name',
            'last_name',
            'date_of_birth',
            'mobile_phone',
            'avatar_url'));

        return response()->json($user, 200);
    }

    public function show()
    {
        if (!Auth::check()) {
            return response()->json([], 201);
        }
        $user = Auth::user();
        return response()->json($user, 200);
    }
}