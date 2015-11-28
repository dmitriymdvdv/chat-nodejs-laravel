<?php

namespace App\Http\Controllers;

use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct(){}

    public function logout()
    {
         Auth::logout();
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
                if(Auth::attempt(['email' => 'test@test.com', 'password' => 'test']))
                {
                    return response()->json(Auth::user());
                }
                /*if(!Hash::check($authData['password'],$user->password_hash))
                {
                    return response()->json($authData, 411);
                } else
                {

                    //Auth::login($user);
                    if(Auth::check()){
                        $test =1;
                    }
                    return response()->json($user, 200);
                }*/
            }
        }
        return response()->json();
    }
}