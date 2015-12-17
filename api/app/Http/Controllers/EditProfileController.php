<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EditProfileController extends Controller
{
    public function __construct()
    {
    }

    public function editData(Request $request)
    {
        $user = Auth::user();
        $data = $request->all();
        if ($user) {
            $path = 'images/avatars/' . $data['file']['path'];
            if (!file_exists($path))
                if (!mkdir($path, 0777, true))
                {
                    $data['error_message'] = 'Can\'t make directory' . $path;
                    return response()->json($data, 400);
                }
            $oldPath = 'temp/' . $user->id . '/temp' . $data['file']['ext'];
            $newPath = 'avatars/' . $data['file']['path'] . $data['file']['name']
                . $data['file']['ext'];
            if (!file_exists($newPath)) {
                Storage::disk('images')->move($oldPath, $newPath);
            }
            $user = User::find($user->id);
            $user->fill($data);
        } else {
            $data['error_message'] = 'You not have access';
            return response()->json($data, 400);
        }
        if ($user->save()) {
            return response()->json($user, 200);
        }
    }

    public function moveFile(Request $request)
    {
        $user = Auth::user();
        $avatar = $request->file('file');
        $ext = pathinfo($avatar->getClientOriginalName(), PATHINFO_EXTENSION);
        $path = 'images/temp/' . $user->id;
        if ($user && $avatar) {
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            $avatar->move($path, 'temp' . '.' . $ext);
        } else {
            $data['error_message'] = 'Can\'t write file' . $path;
            return response()->json($data, 400);
        }
    }

    public function destroy()
    {
        $user = Auth::user();
        if (!rmdir($user['avatar_url'])) {
            $data['error_message'] = 'Oops, something wrong';
            return response()->json($data, 400);
        }
        Auth::logout();
        $user->delete();
        return response()->json(null, 200);
    }
}