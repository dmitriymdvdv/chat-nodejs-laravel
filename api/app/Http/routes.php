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
        Route::put('{id}', ['as' => 'user.update', 'uses' => 'UserController@update']);
        Route::delete('{id}', ['as' => 'user.destroy', 'uses' => 'UserController@destroy']);

    });

    Route::post('/users', 'UserController@index');

    //Chat routes

    Route::post('/chat/create', 'ChatController@create');

});

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');



Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

