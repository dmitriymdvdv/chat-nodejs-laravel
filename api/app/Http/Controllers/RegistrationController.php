<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use DB;
use Validator;
use App\Model\User;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function registration(Request $request)
    {
        $newUser = $this->getUserAttributes($request);
        $newUser['password']  = Hash::make($newUser['password_hash']);
        unset($newUser['password_hash']);

        //todo remake registration



        $user = User::firstOrCreate($newUser)->toArray();

        return response()->json($user, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function getUserAttributes(Request $request)
    {
        return $request->only([
            'email',
            'mobile_phone',
            'first_name',
            'last_name',
            'password_hash'
        ]);
    }

    private function checkUserIsValid($user)
    {
        $validator = Validator::make($user, [
            'email' => 'required|email|max:255',
            'mobile_phone' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'password_hash' => 'required',
        ]);


        if ($validator->fails()) {
            abort(403, 'No valid data.');
        }
    }
}
