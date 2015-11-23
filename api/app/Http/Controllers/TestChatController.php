<?php
/**
 * Created by PhpStorm.
 * User: nafanya
 * Date: 11/20/15
 * Time: 12:24 AM
 */

namespace App\Http\Controllers;


class TestChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function show()
    {
        $chats = [
            ['title' => 'first'],
            ['title' => 'second'],
            ['title' => 'third'],
        ];
        return response()->json($chats, 200);
    }

    public function logout()
    {
        return response()->json(response("you're logout", 200));
    }
}