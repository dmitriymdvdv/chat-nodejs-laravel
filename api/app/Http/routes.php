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

Route::resource(
    'user',
    'UserController',
    ['only' => ['store', 'index', 'show']]
);
Route::group(['middleware' => 'cors', 'prefix' => 'api/v1'], function () {


    // User routes

    Route::get('/user/{id}', ['as' => 'user.show', 'uses' => 'UserController@show']);

    Route::post('/user', ['as' => 'user.store', 'uses' => 'UserController@store']);

    Route::put('/user{id}', ['as' => 'user.update', 'uses' => 'UserController@update']);

    Route::delete('/user{id}', ['as' => 'user.destroy', 'uses' => 'UserController@destroy']);

});

// Default routes

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);

