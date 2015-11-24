<?php

namespace App\Http\Controllers;

use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct(){}

    public function logout()
    {
        Auth::logout();
        $authData = null;
        return response()->json(null, 200);
    }

    public function login(Request $request)
    {

        $authData = $request->all();

        $validator = Validator::make($authData, [
            'email' => 'required',
            'password' => 'required'
        ]);
        if($validator->fails())
        {
            abort(403, 'Invalid data');
        } else
        {
            $user = User::where('email', '=', $authData['email'])->first();


            if(!$user)
            {
                return response()->json($authData, 401);
            } else
            {
                if(!Hash::check($authData['password'],$user->password_hash))
                {
                    return response()->json($authData, 403);
                } else
                {
                    Authenticatable::login($user);
                    return response()->json($authData, 200);
                }
            }
        }
    }
}