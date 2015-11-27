<?php


namespace App\Http\Controllers;


use App\Model\Chat;
use App\Model\User;
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
        'users' => 'required|array'
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
        //TODO: use Auth::user()
        $data['users'][] = $data['user_id'];
        $chat = Chat::create($data);
        $chat->users()->attach($data['users']);

        //TODO: return value
        return response()->json();
    }

    public function index(Request $request)
    {

        $rules = [
            'id' => 'integer|required'
        ];
        //TODO: if($data['id']) === Auth::user()->id
        $data = $request->all();
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([], 400);
        }

        $chats = User::with(['chats.users'])->find($data['id'])->chats;

        if ($chats) {
            return response()->json($chats);
        }

        return response([], 400);

    }

    public function update(Request $request)
    {

        $data = $request->all();
        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            return response()->json([], 400);
        }
        //TODO: use Auth::user()
        $data['users'][] = $data['user_id'];

        $chat = Chat::find($data['id']);
        $chat->fill($data);
        $chat->users()->sync($data['users']);
        if ($chat->save()) {
            return response()->json();
        }
        return response()->json([], 400);
    }

    public function destroy(Request $request)
    {
        $rules = [
            'id' => 'integer|required'
        ];
        //TODO: check authorised user
        $data = $request->all();
        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return response()->json([], 400);
        }

        $chat = Chat::find($data['id']);
        if ($chat->users()->detach() && $chat->delete()) {
            return response()->json();
        }
        return response()->json([], 400);

    }

    public function leave(Request $request)
    {

        $rules = [
            'id' => 'integer|required',
            'user_id' => 'integer|required'
        ];
        $data = $request->all();

        $validator = Validator::make($data, $rules);

        if (!$validator->fails()) {
            $chat = Chat::find($data['id']);

            //TODO: use Auth::user()
            if ($chat->users()->detach($data['user_id'])) {
                return response()->json();
            }
        }

        return response()->json([], 400);


    }
}