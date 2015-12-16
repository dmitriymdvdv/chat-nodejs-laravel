<?php

namespace App\Http\Controllers;

use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
    }

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
        $authData['error_message'] = ' Unable to log in.
                    Please check that you have entered your login and password correctly.';
        if ($validator->fails()) {
            return response()->json($authData, 400);
        }
        if (Auth::attempt(['email' => $authData['email'],
            'password' => $authData['password']])
        ) {
            return response()->json(Auth::user(), 200);
        } else {
            return response()->json($authData, 400);
        }

    }
}