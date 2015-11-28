<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
     public function logout()
    {
        Auth::logout();
        /**
         * here make custom response if needed
         * for example return response()->json();
         */
    }

    public function login(Request $request)
    {

        $authData = $request->all();

        $validator = Validator::make($authData, [
            'email' => 'required',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            abort(403, 'Invalid data');
        }
        if (Auth::attempt(['email' => $authData['email'], 'password' => $authData['password']])) {
            return response()->json(Auth::user());
        }/**
         * here you can add else {} expression and return custom error
         */
        return response()->json();
    }
}