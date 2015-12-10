<?php

namespace App\Http\Controllers;

use Psy\Exception\FatalErrorException;
use Redis;
use App\Model\Chat;
use App\Http\Requests;
use App\Model\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
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
        $data = $request->all();
        $user = Auth::user()->toArray();

        if ((integer)$data['user_id'] === $user['id']) {
            $message = Messages::create($data)->getAttributes();

            $this->addMessageToChatMessages($message, $data['chat_id']);

            $res = Messages::where('id', '=', $message['id'])->with('author')->get();
            $res['chat_id'] = $data['chat_id'];
            Redis::publish('message-channel', json_encode($res));
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $user = Auth::user()->toArray();
        // TODO: add check that this user in chat
        if ($user['id'] === (integer)$request->only('user_id')['user_id']) {

            $chatId = $request->only('chat_id')['chat_id'];

            $messages = Chat::find($chatId)->messages()->with(['author'])->get();

            return response()->json($messages, 200);
        }
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

    private function addMessageToChatMessages($message, $chatId) {

        $messageToChat = new Messages();
        $messageToChat->chatMessages()
            ->attach($message['id'], [
                'chat_id' => $chatId,
                'message_id' => $message['id']
            ]);

    }
}