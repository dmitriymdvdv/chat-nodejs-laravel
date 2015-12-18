<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Model\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class EditProfileController extends Controller
{
    public function __construct()
    {
    }

    public function editData(Request $request)
    {
        $data['file'] = false;
        $data['password'] = false;
        $user = Auth::user();
        $data = $request->all();
        if (isset($data['file'])) {
            if ($user) {
                $path = 'images/avatars/' . $data['file']['path'];
                if (!file_exists($path))
                    if (!mkdir($path, 0777, true))
                    {
                        $data['error_message'] = 'Can\'t make directory' . $path;
                        return response()->json($data, 400);
                    }
                $oldPath = 'temp/' . $user->id . '/temp' . $data['file']['ext'];
                $newPath = 'images/avatars/' . $data['file']['path'] . $data['file']['name']
                    . $data['file']['ext'];
                if (!file_exists($newPath)) {
                    Storage::disk('images')->move($oldPath, $newPath);
                }
            }
        }

        $user = User::find($user->id);
        $user->fill($data);
        if (isset($data['password'])) {
            $user->password = Hash::make($data['password']);
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
        $user = User::find(Auth::user()->id);
        Auth::logout();
        if ($user->delete()) {
            return response()->json();
        }
        return response()->json([], 400);

    }
}