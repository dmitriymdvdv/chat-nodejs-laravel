<?php


namespace App\Http\Controllers;


use App\Model\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    /**
     * Validation Rules
     * @var array
     */
    protected $rules = [
        'name' => 'required|string',
        'description' => 'string',
        'is_private' => 'required|boolean',
        'users_id' => 'required|array'
    ];

    /**
     * Create new chat method
     * @param Request $request
     * @return array
     */
    public function create(Request $request)
    {
        $chatData = $request->input('chatData');
        $chatData['users_id'][] = $chatData['user_id'];
        $validator = Validator::make($chatData,$this->rules);

        if($validator->fails())
        {
            return response()->json([],400);
        }

        $chat = Chat::create($chatData);
        $chat->users()->attach($chatData['users_id']);

        //TODO: return value
        return [];
    }
}