<?php namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserPostRequest;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->all();

        if (!empty($data['user'])) {

            $data['usersId'][] = $data['authorId'];

            $users = User::whereNotIn('id', $data['usersId'])
                ->where(function ($query) use ($data) {
                    $query->where('first_name', 'LIKE', '%' . $data['user'] . '%')
                        ->orWhere('last_name', 'LIKE', '%' . $data['user'] . '%');
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

    public function show($id)
    {
        $user = $this->createFakeUser($id);
        return response()->json($user, 200);
    }

    private function createFakeUser($id){
        return array(
            'id' => $id,
            'email' => 'email@mail.ru',
            'first_name' => 'John',
            'last_name' => 'Conor',
            'date_of_birth' => '22.03.1990',
            'mobile_phone' => '357-22-32',
            'avatar_url' => 'url'
        );
    }
}