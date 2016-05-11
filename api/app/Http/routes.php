<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => 'cors', 'prefix' => 'api/v1'], function () {

    Route::post('register', 'RegistrationController@registration');

    Route::group(['prefix' => 'user'], function () {
        Route::get('{id}', ['as' => 'user.show', 'uses' => 'UserController@show']);
        Route::post('/', ['as' => 'user.store', 'uses' => 'UserController@store']);
        Route::put('/edit', 'EditProfileController@editData');
        Route::delete('/', 'EditProfileController@destroy');
        Route::post('/edit', 'EditProfileController@moveFile');
        Route::get('/current', 'UserController@show');
    });

    Route::get('/users', 'UserController@index');

    //Chat routes

    Route::post('chat/create', 'ChatController@create');
    Route::put('chat', 'ChatController@update');
    Route::get('chat/list{type}', 'ChatController@chatList');
    Route::put('chat/leave', 'ChatController@leave');
    Route::delete('chat', 'ChatController@destroy');
    Route::get('chat/list', 'ChatController@chatList');

    //auth routes
    Route::post('/login', 'AuthController@login');
    Route::get('/logout', 'AuthController@logout');

    
    Route::post('message', 'MessageController@store');
    Route::get('message', 'MessageController@show');
    
});

Route::group(['middleware' => 'cors', 'prefix' => 'api/v2'], function () {

    Route::get('users', 'UserController@allUsers');

    Route::get('chats', 'ChatController@allChatList');

    Route::group(['prefix' => 'user'], function () {
        Route::get('{id}', ['as' => 'user.show', 'uses' => 'UserController@show']);
        Route::post('/', ['as' => 'user.store', 'uses' => 'UserController@store']);
        Route::put('/edit', 'EditProfileController@editData');
        Route::delete('/', 'EditProfileController@destroy');
        Route::post('/edit', 'EditProfileController@moveFile');
        Route::get('/current', 'UserController@show');
    });

    Route::post('chat/findOrCreate', 'ChatController@findOrCreate');
    Route::post('chat/create', 'ChatController@create');
    Route::put('chat', 'ChatController@update');
    Route::get('chat/list{type}', 'ChatController@chatList');
    Route::put('chat/leave', 'ChatController@leave');
    Route::delete('chat', 'ChatController@destroy');
    Route::get('chat/list', 'ChatController@chatList');

    Route::post('/login', 'AuthController@login');
    Route::get('/logout', 'AuthController@logout');

//    Route::post('message', 'MessageController@store');
    Route::post('message',  'MessageController@showMessages');


});

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');



Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

