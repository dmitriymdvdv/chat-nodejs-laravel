<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 5:10 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserToChat extends Model {

    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'users_to_chats';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['user_id','chat_id'];
    /*
     *
     */
    public function chat()
    {
        return $this->hasMany('App\Model\Chat','chat_id');
    }
    /*
     *
     */
    public function user()
    {
        return $this->hasMany('App\Model\User','user_id');
    }
}