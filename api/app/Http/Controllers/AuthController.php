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
        }
        if (Auth::attempt(['email' => $authData['email'],
                         'password' => $authData['password']])) {
            return response()->json(Auth::user(),200);
        } else {
            $user = User::where('email', '=', $authData['email'])->first();
            if(!$user)
            {
                $authData['error_message'] = 'You input wrong email';
                return response()->json($authData, 400);
            } else
                if(!Hash::check($authData['password'],$user->password))
                {
                    $authData['error_message'] = 'You input wrong password';
                    return response()->json($authData, 400);
                }
        }
        return response()->json();
    }
}