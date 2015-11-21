<?php


namespace App\Http\Controllers;


use App\Model\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function create(Request $request)
    {
        $chatData = $request->input('chatData');
        $usersInChat = $request->input('usersInChat');
        $usersInChat['users_id'][] = $chatData['user_id'];

        $chat = Chat::create($chatData);
        $chat->users()->attach($usersInChat['users_id']);

        //TODO: return value
        return [];
    }
}