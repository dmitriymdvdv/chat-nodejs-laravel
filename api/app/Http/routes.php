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

    Route::post('/register', 'RegistrationController@registration');

    Route::group(['prefix' => 'user'], function () {

        Route::post('/', ['as' => 'user.store', 'uses' => 'UserController@store']);
        Route::put('{id}', ['as' => 'user.update', 'uses' => 'UserController@update']);
        Route::delete('{id}', ['as' => 'user.destroy', 'uses' => 'UserController@destroy']);

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

});

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');


Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

