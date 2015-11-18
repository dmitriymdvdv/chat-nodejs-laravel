<?php


namespace App\Http\Controllers;


class TestController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function index() {
        $users =  [
            ['name' => 'Vasia'],
            ['name' => 'Petia'],
            ['name' => 'Bob'],
            ['name' => 'Lol'],
            ['name' => 'SpiderMan'],
            ['name' => 'Wechka'],
            ['name' => 'Fred'],
            ['name' => 'Jack'],
            ['name' => 'Rob'],
            ['name' => 'Batman'],
            ['name' => 'Jem'],
            ['name' => 'They'],
            ['name' => 'Dog'],
            ['name' => 'Vitia'],
        ];
        return response()->json($users);
    }
}