<?php namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use App\Http\Requests\IndexUserGetRequest;
use App\Http\Requests\StoreUserPostRequest;


class UserController extends Controller
{
    public function index(IndexUserGetRequest $req)
    {
        if (!$req->has('sp')) {
            $sp = 0;
        } else {
            $sp = intval($req->input('sp'));
        }

        $response = [
            'sp' => $sp + 10,
            'users' => User::orgerBy('created_at', 'desc')->skip($sp)->take(10)->get()
        ];

        if (count($response['users']) > 0) {
            return response()->json($response, 200);
        } else {
            return response()->json($response, 404);
        }
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

    public function show($id)
    {
//        $user = User::findOrFail($id);
        $user = $this->createFakeUser($id);
        return response()->json($user, 200);
    }

    private function createFakeUser($id){
        return array(
            'email' => 'email@mail.ru',
            'first_name' => 'John',
            'last_name' => 'Conor',
            'date_of_birth' => '22.03.1990',
            'mobile_phone' => '357-22-32',
            'avatar_url' => 'url'
        );
    }
}