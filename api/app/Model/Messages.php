<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:54 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    public $timestamps = false;

    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','user_id', 'message','date_of_creation'];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['pivot', 'user_id'];
    /*
     *
     */
    public function author()
    {
        return $this->belongsTo('App\Model\User', 'user_id');
    }
    /*
     *
     */
    public function usersMessages()
    {
        return $this->hasOne('App\Model\UserMessages', 'message_id');
    }
    /*
     *
     */
    public function chatMessages()
    {
        return $this->belongsToMany('App\Model\Chat', 'chat_messages', 'chat_id', 'message_id');
    }
}