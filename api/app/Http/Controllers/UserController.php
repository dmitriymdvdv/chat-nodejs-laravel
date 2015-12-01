<?php namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserPostRequest;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->all();

        if (!empty($data['query'])) {

            $data['users_id'][] = $data['user_id'];

            $users = User::whereNotIn('id', $data['users_id'])
                ->where(function ($query) use ($data) {
                    $query->where('first_name', 'LIKE', '%' . $data['query'] . '%')
                        ->orWhere('last_name', 'LIKE', '%' . $data['query'] . '%');
                })
                ->get(['id', 'first_name', 'last_name']);

            return response()->json($users);
        }

        return [];
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
            'avatar_url' ));

        return response()->json($user, 200);
    }

    public function show()
    {
        if(!Auth::check()){
            return response()->json([],200);
        }
        $user = Auth::user();
        return response()->json($user, 200);
    }
}