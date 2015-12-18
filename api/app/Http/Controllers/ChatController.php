<?php


namespace App\Http\Controllers;


use App\Model\Chat;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    protected $userId;
    /**
     * Validation Rules
     * @var array
     */
    protected $rules = [
        'name' => 'required|string',
        'description' => 'string',
        'is_private' => 'required|boolean'
    ];

    /**
     * Create new chat method
     * @param Request $request
     * @return array
     */
    public function create(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            return response()->json([], 400);
        }
        if ($data['is_private']) {
            $data['users'][] = $this->userId;
            $data['user_id'] = $this->userId;
            $chat = Chat::create($data);
            $chat->users()->attach($data['users']);
        } else {
            $data['user_id'] = $this->userId;
            $chat = Chat::create($data);
        }
        if($chat->is_private) {
            $users = $chat->users()->get();

            return response()->json([
                $chat,
                $users
            ]);
        }


        return response()->json($chat);
    }

    public function __construct()
    {
        if (Auth::check()) {
            $this->userId = Auth::user()->id;
        }
    }

    public function chatList(Request $request)
    {
        $data = $request->all();
        $rules = [
            'type' => 'string|required',
            'all' => 'string',
            'id' => 'integer'
        ];
        if (Auth::check()) {
            if ($data['type'] === 'public') {
                if ($data['all'] === 'true') {

                    $chats = Chat::where('is_private', 0)->get();

                }
            } elseif ($data['type'] === 'private') {
                if ($data['all'] === 'true') {

                    $chats = User::with(['chats.users'])
                        ->find($this->userId)
                        ->chats
                        ->where('is_private', 1);

                }
            } elseif ($data['type'] === 'all') {

                $public = Chat::where('user_id', $this->userId)
                    ->where('is_private', 0)
                    ->get();
                $private = User::with(['chats.users'])
                    ->find($this->userId)
                    ->chats
                    ->where('is_private', 1);

                return response()->json([
                    'public' => $public,
                    'private' => $private
                ]);

            }

            if ($chats) {

                return response()->json($chats);

            }
        }

        return response()->json([], 400);

    }

    public function update(Request $request)
    {

        if (Auth::check()) {
            $data = $request->all();
            $validator = Validator::make($data, $this->rules);

            if ($validator->fails()) {
                return response()->json([], 400);
            }
            if ($data['users']) {
                $data['users'][] = $this->userId;

                $chat = Chat::find($data['id']);
                if ($chat->user_id == $this->userId) {
                    $chat->fill($data);
                    $chat->users()->sync($data['users']);
                }
            } else {
                $chat = Chat::find($data['id']);
                if ($chat->user_id == $this->userId)
                    $chat->fill($data);
            }
            if ($chat->save()) {
                return response()->json();
            }
        }
        return response()->json([], 400);
    }

    public function destroy(Request $request)
    {
        if (Auth::check()) {
            $rules = [
                'id' => 'integer|required',
                'is_private' => 'boolean|required'
            ];
            $data = $request->all();
            $validator = Validator::make($data, $rules);

            if ($validator->fails()) {
                return response()->json([], 400);
            }

            $chat = Chat::find($data['id']);

            if ($chat->user_id == $this->userId) {
                if ($data['is_private'] == 1) {
                    if ($chat->users()->detach() && $chat->delete()) {
                        return response()->json();
                    }
                } elseif ($data['is_private'] == 0) {
                    if ($chat->delete()) {
                        return response()->json();
                    }
                }
            }
        }
        return response()->json([], 400);

    }

    public function leave(Request $request)
    {

        if (Auth::check()) {
            $rules = [
                'id' => 'integer|required'
            ];
            $data = $request->all();

            $validator = Validator::make($data, $rules);

            if (!$validator->fails()) {
                $chat = Chat::find($data['id']);

                if ($chat->users()->detach($this->userId)) {
                    return response()->json();
                }
            }
        }

        return response()->json([], 400);


    }
}